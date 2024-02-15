import { Component, Input } from '@angular/core';
import { ApiResponseRegisterQuestionIT, BodyRegisterQuestionIT } from '../../../interfaces/activities.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastAlertsService } from '../../../../shared-components/services/toast-alerts.service';
import { ActivitiesService } from '../../../services/activities.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-complete-word',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SpinnerComponent
  ],
  providers: [
    ActivitiesService
  ],
  templateUrl: './complete-word.component.html',
  styleUrls: ['./complete-word.component.css', '../single-select/single-select.component.css']
})
export class CompleteWordComponent {

  //Variables
  @Input() moduleId: number = 0;
  static activityID: number = 0;
  questionForm!: FormGroup;
  spinnerStatus: boolean = false;

  //constructor
  constructor(
    private formBuilder: FormBuilder,
    private activitiesService: ActivitiesService,
    private toastr: ToastAlertsService,
    private router: Router
  ) { }

  //ngOnInit
  ngOnInit() {
    this.spinnerStatus = true;
    this.createQuestionForm();
    console.log(CompleteWordComponent.activityID);
  }

  //Método que obtiene los headers
  getHeaders() {
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("typeUser", sessionStorage.getItem("typeUser"));
    return headers;
  }

  //Método que crea el formulario para crear un módulo
  createQuestionForm() {
    this.questionForm = this.formBuilder.group({
      textRoot: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.:;()\\s]*$')
        ]
      ],
      wordToComplete: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
        ]
      ],
      hind: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.:;()\\s]*$')
        ]
      ],
      difficulty: ['',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(2)
      ]
    ],
    });
  }

  //Método que consume el servicio para registrar una pregunta manualmente o con IA
  registerQuestion() {
    this.spinnerStatus = false;
    let body: BodyRegisterQuestionIT = {
      text_root: this.questionForm.get('textRoot')?.value,
      difficulty:  this.questionForm.get('difficulty')?.value,
      type_question: "complete_word",
      options: {
        select_mode: "",
        text_options: [],
        text_to_complete: this.questionForm.get('wordToComplete')?.value.toLowerCase(),
        hind: this.questionForm.get('hind')?.value
      },
      correct_answer: {
        true_or_false: false,
        text_options: [],
        text_to_complete: [this.questionForm.get('wordToComplete')?.value.toLowerCase()]
      }
    }
    this.activitiesService.registerQuestion(this.getHeaders(), body, this.moduleId)
    .subscribe({
      next: (data: ApiResponseRegisterQuestionIT) => {
        if(data.id != 0) {
          this.spinnerStatus = true;
          this.questionForm.reset();
          this.toastr.showToastSuccess("Pregunta registrada correctamente", "Éxito");
          this.router.navigateByUrl("/teacher/home/activities/list-activities");
        }
      },
      error : (error: any) => {
        this.spinnerStatus = true;
        this.toastr.showToastError("Error", "No se pudo registrar su pregunta");
      }
    })
  }

  //Icons to use
  iconCube = iconos.faCube;
  iconIA = iconos.faWandMagicSparkles;
}
