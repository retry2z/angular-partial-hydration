import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterComponent } from '@components/counter/counter.component';
import { HeadingComponent } from '@components/heading/heading.component';
import { SimpleTextComponent } from '@components/simple-text/simple-text.component';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CounterComponent, SimpleTextComponent, HeadingComponent],
  standalone: true,
})
export class PageTwoComponent {

  constructor() { }

  ngOnInit(): void {
    console.log('PageTwoComponent Init');
  }
}
