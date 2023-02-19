import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor() { }

  ngOnInit(): void {
    console.log('AppComponent Init');
  }
 }
