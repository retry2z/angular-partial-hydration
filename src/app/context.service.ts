import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { EventEmitterService } from '@services/event-emitter.service';
import { BehaviorSubject } from 'rxjs';

export interface ContextState {
  isCookieModalOpen: boolean;
  isServer: boolean;
  isBrowser: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private stateKey = makeStateKey<Object>('context');
  public readonly stateChanges$: BehaviorSubject<ContextState> = new BehaviorSubject<any>({
    ...this.transferState.get(this.stateKey, {}),
    isBrowser: isPlatformBrowser(this.platformId),
    isServer: isPlatformServer(this.platformId),
  });

  constructor(
    private transferState: TransferState,
    private emitter: EventEmitterService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // SETTING INITIAL STATE ON SERVER
    if (isPlatformServer(this.platformId)) {
      this.setState({
        isCookieModalOpen: false,
      });
    }

    // SETTING INITIAL STATE ON BROWSER
    if (isPlatformBrowser(this.platformId)) {
      this.setState({
        isCookieModalOpen: true,
      });
    }

    // HYDRATING COOKIE MODAL
    if (this.state.isCookieModalOpen) {
      this.emitter.emit(
        'hydration',
        '@components/cookie-modal/cookie-modal.component>>CookieModalComponent>>default>>app-cookie-modal'
      )
    }
  }

  //STATE-CONTROL
  public get state(): ContextState {
    return this.stateChanges$.getValue();
  }
  public setState = (newState: Partial<ContextState>): void => {
    const updatedState = { ...this.state, ...newState };
    this.transferState.set(this.stateKey, updatedState);
    this.stateChanges$.next(updatedState);
  }
}
