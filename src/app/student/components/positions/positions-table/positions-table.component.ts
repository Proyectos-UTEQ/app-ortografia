import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-positions-table',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './positions-table.component.html',
  styleUrl: './positions-table.component.css'
})
export class PositionsTableComponent {

  //Icons to use
  iconViewInfoProfile = iconos.faCircleChevronRight;
}
