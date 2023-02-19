import { DOCUMENT } from "@angular/common";
import { ApplicationRef, ComponentRef, createComponent, Inject, Injectable, NgZone, Type } from "@angular/core";
import { Router } from "@angular/router";
import { ContextService } from "@context";
import { EventEmitterService } from "@services/event-emitter.service";
import { AsyncSubject, Observable, takeUntil } from "rxjs";

const RESOLVER_DICTIONARY: { [key: string]: Function } = {
  "@components/cookie-modal/cookie-modal.component": () => import('@components/cookie-modal/cookie-modal.component'),
  "@components/counter/counter.component": () => import('@components/counter/counter.component')
}

@Injectable({
  providedIn: 'root'
})
export class HydrationService {
  public isBootstrapped: boolean = this.context.state.isServer;
  private bootstrap$: AsyncSubject<boolean> = new AsyncSubject();
  private componentRefs: ComponentRef<unknown>[] = [];
  private that: any = this;
  private EVENTS_DICTIONARY: { [key: string]: Function } = {
    'init': this.hydrateByInit.bind(this.that),
    'click': this.hydrateByAttachEventListener.bind(this.that),
    'default': this.hydrateByDefault.bind(this.that)
  }

  constructor(
    private context: ContextService,
    @Inject(DOCUMENT) private document: Document,
    private applicationRef: ApplicationRef,
    private emitter: EventEmitterService,
    private router: Router,
  ) {
    if (this.context.state.isServer) return

    // BOOTSTRAP APPLICATION AFTER NAVIGATION
    this.document.addEventListener('click', this.hydrateByNavigation);

    // GETTING ALL NODES FOR HYDRATION
    const bootstrapNodes = Array.from(this.document.querySelectorAll('[hydration]'));
    for (const elRef of bootstrapNodes) {
      const resolver = (elRef.attributes as any)['hydration'].value;
      const [resolverId, componentName, eventName = ''] = resolver.split(">>");
      this.select(resolverId).then((component) => {
        if (!component || !component.hasOwnProperty(componentName)) return;
        if (eventName && this.EVENTS_DICTIONARY.hasOwnProperty(eventName)) {
          this.EVENTS_DICTIONARY[eventName](elRef, eventName, component[componentName], resolverId);
        }
      });
    }

    // SUBSCRIBING FOR GLOBAL EVENT WITCH WILL TRIGGER HYDRATION
    this.emitter.selectEvent<string>('hydration')
      .pipe(takeUntil(this.bootstrap$))
      .subscribe((resolver) => {
        const [resolverId, componentName, eventName = '', selector = ''] = resolver.split(">>");
        const elRef = this.document.querySelector(selector);

        if (!elRef) return
        this.select(resolverId).then((component) => {
          if (!component || !component.hasOwnProperty(componentName)) return;
          if (eventName && this.EVENTS_DICTIONARY.hasOwnProperty(eventName)) {
            this.EVENTS_DICTIONARY[eventName](elRef, eventName, component[componentName], resolverId);
          }
        });
      });
  }

  //Hydration Listeners
  private hydrateByNavigation = async (event: any) => {
    if (!event || !event.target) return
    const link = event.target?.getAttribute('href') || event.target.parentElement?.getAttribute('href') || event.target.parentElement?.parentElement?.getAttribute('href');
    if (!link || link.includes('#')) return true;
    this.bootstrapAppRef();
    this.document.removeEventListener('click', this.hydrateByNavigation);
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([link]);
    return false;
  }
  private hydrateByAttachEventListener(elRef: Element, eventName: string, component: Type<unknown>): void {
    if (!eventName) return;
    const callback = () => {
      this.hydrate(component, elRef);
      elRef.removeEventListener(eventName, callback);
    };
    elRef.addEventListener(eventName, callback);
  }
  private hydrateByInit(elRef: Element, eventName: string, component: Type<unknown>): void {
    if (!eventName) return;
    const observer = new IntersectionObserver((entries: any) => {
      entries.forEach((el: any) => {
        const shouldHydrate = el.intersectionRatio > 0 && el.intersectionRect.width > 0 && el.intersectionRect.height > 0;
        if (shouldHydrate) {
          this.hydrate(component, elRef);
          observer.disconnect()
        }
      })
    }, { root: null, threshold: 0.3, rootMargin: '20px' })
    observer.observe(elRef);
  }
  private hydrateByDefault(elRef: Element, eventName: string, component: Type<unknown>): void {
    this.hydrate(component, elRef);
  }

  //Hydration Utilities
  public initializeApp = (): Observable<boolean> | boolean => {
    if (this.context.state.isServer) return true
    return this.bootstrap$;
  }
  private hydrate = async (component: Type<unknown>, elRef: Element) => {
    this.applicationRef.injector.get(NgZone).run(() => {
      const componentRef = createComponent(component, {
        environmentInjector: this.applicationRef.injector,
        hostElement: elRef
      })
      // componentRef.setInput('data', { test: 'text input data' });
      this.applicationRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
    });
  }
  public select = async (key: string): Promise<any> => {
    return RESOLVER_DICTIONARY.hasOwnProperty(key)
      ?
      await RESOLVER_DICTIONARY[key]()
      :
      { StrapiComponent: null };
  }
  public bootstrapAppRef = (): void => {
    this.bootstrap$.next(true);
    this.bootstrap$.complete();
    this.isBootstrapped = true;
    for (const componentRef of this.componentRefs) {
      this.applicationRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
  }
}
