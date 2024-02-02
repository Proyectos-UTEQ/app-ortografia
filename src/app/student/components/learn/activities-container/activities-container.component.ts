import { OrderWordsComponent } from './../order-words/order-words.component';
import { Component } from '@angular/core';
import { SweetAlertsConfirm } from '../../../../shared-components/alerts/confirm-alerts.component';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectWithSentenceComponent } from '../select-with-sentence/select-with-sentence.component';
import { SelectSeveralCorrectComponent } from '../select-several-correct/select-several-correct.component';
import { CompleteParagraphComponent } from '../complete-paragraph/complete-paragraph.component';
import { TrueOrFalseComponent } from '../true-or-false/true-or-false.component';
import { ModulesService } from '../../../services/modules.service';
import { ActivitiesDetailI, ApiResponseGetActivitiesByLessonI } from '../../../interfaces/lessons';
import { ToastAlertsService } from '../../../../shared-components/services/toast-alerts.service';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-activities-container',
  standalone: true,
  imports: [
    FontAwesomeModule,
    SelectWithSentenceComponent,
    SelectSeveralCorrectComponent,
    CompleteParagraphComponent,
    OrderWordsComponent,
    TrueOrFalseComponent,
    SpinnerComponent,
    CompleteParagraphComponent
  ],
  providers: [
    SweetAlertsConfirm,
    ModulesService,
  ],
  templateUrl: './activities-container.component.html',
  styleUrl: './activities-container.component.css'
})
export class ActivitiesContainerComponent {
  //Variables
  selectedOption: string = '';
  static moduleID: number = 0;
  spinnerStatus: boolean = false;
  arrayActivities: ActivitiesDetailI[] = [];
  nextActivity: number = 1;

  answersMultiSelectActivity: string[] = [];
  answerSingleSelectActivity: string[] = [];
  answerOrderActivity: string[] = [];
  answerTrueOrFalseActivity: boolean = false;

  //constructor
  constructor(
    private router: Router,
    private sweetAlerts: SweetAlertsConfirm,
    private modulesService: ModulesService,
    private toastr: ToastAlertsService
  ) { }

  //ngOnInit
  ngOnInit() {
    /* this.generateNewLesson(); */
    this.getActivitiesByLessonID(60);
    this.modulesService.getSelectedOption().subscribe(option => {
      this.selectedOption = option;
    });
  }

  //Método que obtiene los headers
  getHeaders() {
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("typeUser", sessionStorage.getItem("typeUser"));
    return headers;
  }

  //Método que genera una nueva lección
  generateNewLesson() {
    this.spinnerStatus = false;
    this.modulesService.newLesson(this.getHeaders(), ActivitiesContainerComponent.moduleID).subscribe({
      next: (data: any) => {
        if (data != 0) {
          this.spinnerStatus = true;
          this.toastr.showToastSuccess("Se ha generado una nueva práctica", "¡Éxito!");
          this.getActivitiesByLessonID(data.testId)
        }
        else {
          this.spinnerStatus = true;
          this.toastr.showToastError("Error", "No se ha podido generar una nueva práctica");
        }
      }
    })
  }

  //Método que obtiene el listado de las actividades según el ID del módulo
  getActivitiesByLessonID(lessonID: number) {
    this.spinnerStatus = false;
    this.modulesService.getActivitiesByLesson(this.getHeaders(), lessonID)
      .subscribe({
        next: (data: ApiResponseGetActivitiesByLessonI) => {
          this.spinnerStatus = true;
          console.log("Listado de actividades")
          console.log(data);
          this.arrayActivities = data.test_module_question_answers;
        }
      })
  }

  //Método que obtiene las opciones seleccionadas en la actividad de select-several-correct
  getMultiOptionsSelected(optionsSelected: string[]) {
    this.answersMultiSelectActivity = optionsSelected;
  }

  //Método que obtiene la opción seleccionada en la actividad de select-with-sentence
  getSingleOptionSelected(optionSelected: string[]) {
    this.answerSingleSelectActivity = optionSelected;
  }

  //Método que obtiene el array con las palabras ordenadas en la actividad de ordenar palabras
  getWordsInOrder(orderedWords: string[]) {
    this.answerOrderActivity = orderedWords;
  }

  //Método que obtiene el array con las palabras ordenadas en la actividad de ordenar palabras
  getTrueOrFalse(optionBoolean: boolean) {
    this.answerTrueOrFalseActivity = optionBoolean;
  }

  //Método que ejecuta un alert para confirmar si desea abandonar la práctica
  leavePractice() {
    this.sweetAlerts.alertConfirmCancelQuestion("Abandonar práctica", "¿Estás seguro de querer abandonar la práctica que tiene en curso?").then(respuesta => {
      if (respuesta.value == true) {
        this.router.navigateByUrl('student/home/learn/modules');
      }
    });
  }

  //Método que valida la respuesta y avanza a la siguiente pregunta
  checkAnswer(){
    this.nextActivity++;
  }


  //Icons to use
  iconExit = iconos.faXmark;
  iconNext = iconos.faArrowRight;
  iconLeave = iconos.faXmark;
  iconLifes = iconos.faHeart;
}
