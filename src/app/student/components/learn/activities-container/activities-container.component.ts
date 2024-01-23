import { Component } from '@angular/core';
import { SweetAlertsConfirm } from '../../../../shared-components/alerts/confirm-alerts.component';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ModulesComponent } from '../modules/modules.component';
import { SelectWithSentenceComponent } from '../select-with-sentence/select-with-sentence.component';

@Component({
  selector: 'app-activities-container',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ModulesComponent,
    SelectWithSentenceComponent
  ],
  providers: [
    SweetAlertsConfirm
  ],
  templateUrl: './activities-container.component.html',
  styleUrl: './activities-container.component.css'
})
export class ActivitiesContainerComponent {
  //constructor
  constructor(
    private router: Router,
    private sweetAlerts: SweetAlertsConfirm
  ){}

  //ngOnInit
  ngOnInit(){
  }

  //Método que ejecuta un alert para confirmar si desea abandonar la práctica
  leavePractice(){
    this.sweetAlerts.alertConfirmCancelQuestion("Abandonar práctica", "¿Estás seguro de abandonar tu práctica del módulo \"" +  + "\"?").then(respuesta => {
      if (respuesta.value == true) {
        this.router.navigateByUrl('student/home/learn/modules');
      }
    });
  }

  //Icons to use
  iconExit = iconos.faXmark;
  iconNext = iconos.faArrowRight;
  iconLeave = iconos.faXmark;
  iconLifes = iconos.faHeart;
}
