import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextService } from '@context';

@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookie-modal.component.html',
  styleUrls: ['./cookie-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[attr.data-open]': 'context.state.isCookieModalOpen',
  },
  imports: [RouterModule]
})
export class CookieModalComponent {

  constructor(public context: ContextService) { }

  ngOnInit(): void {
    console.log('CookieModalComponent Init');
  }

  public handleAcceptClick(): void {
    this.context.setState({
      isCookieModalOpen: false
    });
  }
}
