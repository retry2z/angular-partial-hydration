import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'main [shell-root]',
  template: `
            <router-outlet></router-outlet>
            <router-outlet name="cookie-modal-component"></router-outlet>
            `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {

  constructor() { }

  ngOnInit(): void {
    console.log('ShellComponent Init');
  }
}
