import { FormBuilder, FormGroup, FormsModule, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../../services/activities.service';
import { ApiResponseRegisterQuestionIT, BodyRegisterQuestionIT } from '../../../interfaces/activities.interface';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import { ToastAlertsService } from '../../../../shared-components/services/toast-alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-select',
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
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css'
})
export class SingleSelectComponent {

  //Variables
  @Input() moduleId: number = 0;
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
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
        ]
      ],
      optionOne: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
        ]
      ],
      optionTwo: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
        ]
      ],
      optionThree: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
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
      type_question: "multi_choice_text",
      options: {
        select_mode: "single",
        text_options: [
          this.questionForm.get('optionOne')?.value,
          this.questionForm.get('optionTwo')?.value,
          this.questionForm.get('optionThree')?.value
        ],
        text_to_complete: "",
        hind: ""
      },
      correct_answer: {
        true_or_false: false,
        text_options: [
          this.questionForm.get('optionOne')?.value
        ],
        text_to_complete: []
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
