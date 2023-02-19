import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-simple-text',
  templateUrl: './simple-text.component.html',
  styleUrls: ['./simple-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[RouterModule],
  standalone: true,
})
export class SimpleTextComponent {

  constructor() { }

  ngOnInit(): void {
    console.log('SimpleTextComponent Init');
  }
}
