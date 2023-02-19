import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterComponent } from '@components/counter/counter.component';
import { SimpleTextComponent } from '@components/simple-text/simple-text.component';

@Component({
  selector: 'app-page-1',
  templateUrl: './page-1.component.html',
  styleUrls: ['./page-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CounterComponent, SimpleTextComponent],
  standalone: true,
})
export class PageOneComponent {

  constructor() { }

  ngOnInit(): void {
    console.log('PageOneComponent Init');
  }
}
