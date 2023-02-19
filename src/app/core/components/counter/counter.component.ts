import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'hydration': '@components/counter/counter.component>>CounterComponent>>init',
  },
})
export class CounterComponent {
  public count: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log('CounterComponent Init');
  }

  public increase(): void {
    this.count = this.count + 1;
  }

  public decrease(): void {
    this.count = this.count - 1;
  }
}
