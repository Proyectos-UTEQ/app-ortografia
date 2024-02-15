import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import { ActivitiesService } from '../../../services/activities.service';
import { ToastAlertsService } from '../../../../shared-components/services/toast-alerts.service';
import { Router } from '@angular/router';
import { ApiResponseRegisterQuestionIT, BodyRegisterQuestionIT } from '../../../interfaces/activities.interface';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-true-or-false',
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
  templateUrl: './true-or-false.component.html',
  styleUrls: ['./true-or-false.component.css', '../single-select/single-select.component.css']
})
export class TrueOrFalseComponent {

  //Variables
  @Input() moduleId: number = 0;
  questionForm!: FormGroup;
  spinnerStatus: boolean = false;
  selectedOption: string | null = null;
  answer: boolean = false;

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
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ!¡¿?.,;:{}[\\]()"\'#$%&=\\s]*$')
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

  //Método que selecciona la opción al hacer click
  selectOption(optionId: string, option: boolean) {
    if (option) {
      this.selectedOption = optionId;
    } else {
      this.selectedOption = null;
    }
    const inputElement = document.getElementById(optionId) as HTMLInputElement;
    inputElement.click();
    this.selectedOption = optionId;
    this.answer = option;
  }

  //Método que consume el servicio para registrar una pregunta manualmente o con IA
  registerQuestion() {
    this.spinnerStatus = false;
    let body: BodyRegisterQuestionIT = {
      text_root: this.questionForm.get('textRoot')?.value,
      difficulty: this.questionForm.get('difficulty')?.value,
      type_question: "true_or_false",
      options: {
        select_mode: "",
        text_options: [],
        text_to_complete: "",
        hind: ""
      },
      correct_answer: {
        true_or_false: this.answer,
        text_options: [],
        text_to_complete: []
      }
    }
    this.activitiesService.registerQuestion(this.getHeaders(), body, this.moduleId)
      .subscribe({
        next: (data: ApiResponseRegisterQuestionIT) => {
          if (data.id != 0) {
            this.spinnerStatus = true;
            this.questionForm.reset();
            this.toastr.showToastSuccess("Pregunta registrada correctamente", "Éxito");
            this.router.navigateByUrl("/teacher/home/activities/list-activities");
          }
        },
        error: (error: any) => {
          this.spinnerStatus = true;
          this.toastr.showToastError("Error", "No se pudo registrar su pregunta");
        }
      })
  }

  
  //Icons to use
  iconCube = iconos.faCube;
  iconIA = iconos.faWandMagicSparkles;
}
