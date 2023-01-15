import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
const ICON_DATA = {
  faArrowUp: faChevronUp,
  faArrowDown: faChevronDown,
}

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css']
})
export class CardDashboardComponent {
  @Input() icon! : IconProp;
  @Input() title = '';
  @Input() value = '';
  @Input() valueChange = '';
  @Input() isIncrement = false;
  arrow = ICON_DATA
}
