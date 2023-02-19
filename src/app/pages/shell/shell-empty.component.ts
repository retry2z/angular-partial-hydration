import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'main [shell-empty]',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ShellEmptyComponent {

  constructor() { }

  ngOnInit(): void {
    console.log('ShellEmptyComponent Init');
  }
 }
