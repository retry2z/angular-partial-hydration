import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[],
  standalone: true,
})
export class HeadingComponent {
  @Input() text:string='';

  constructor() { }

  ngOnInit(): void {
    console.log('HeadingComponent Init');
  }
}
