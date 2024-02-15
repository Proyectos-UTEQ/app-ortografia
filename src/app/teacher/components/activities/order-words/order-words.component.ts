import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import { FormBuilder, FormControl, FormGroup, FormRecord, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ApiResponseRegisterQuestionIT, BodyRegisterQuestionIT } from '../../../interfaces/activities.interface';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../../services/activities.service';
import { Router } from '@angular/router';
import { ToastAlertsService } from '../../../../shared-components/services/toast-alerts.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-words',
  standalone: true,
  imports: [
    FontAwesomeModule,
    SpinnerComponent,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    ActivitiesService
  ],
  templateUrl: './order-words.component.html',
  styleUrls: ['./order-words.component.css', '../single-select/single-select.component.css']
})
export class OrderWordsComponent {

  //Variables
  @Input() moduleId: number = 0;
  spinnerStatus: boolean = false;
  validateForm: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  questionForm!: FormGroup;
  limit: number = 0;
  tidyOptions: string[] = [];
  messyOptions: string[] = [];

  //constructor
  constructor(
    private fb: NonNullableFormBuilder,
    private formBuilder: FormBuilder,
    private activitiesService: ActivitiesService,
    private toastr: ToastAlertsService,
    private router: Router
  ) { }

  //ngOnInit
  ngOnInit(): void {
    this.spinnerStatus = true;
    this.createQuestionForm();
    this.addField();
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
      difficulty: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(2)
        ]
      ],
    });
  }

  //Método que agrega las filas
  addField(e?: MouseEvent): void {
    e?.preventDefault();
    this.limit = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const controlInstance = `option ${this.limit}`;
    const control = {
      id: this.limit,
      controlInstance
    };
    this.listOfControl.push(control);
    this.validateForm.addControl(
      controlInstance,
      this.fb.control('', Validators.required)
    );
    this.limit = this.listOfControl.length >= 5 ? 5 : this.listOfControl.length - 1;
  }

  //Método que elimina las filas
  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
      this.limit = this.listOfControl.length >= 5 ? 5 : this.listOfControl.length - 1;
    }
  }

  //Método que desordena el array
  shuffleArray<T>(array: T[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  //Método que manda a registrar la pregunta
  registerQuestion() {
    this.tidyOptions = this.listOfControl.map(control => this.validateForm.get(control.controlInstance)?.value);
    this.messyOptions = this.shuffleArray(this.tidyOptions);

    this.spinnerStatus = false;
    let body: BodyRegisterQuestionIT = {
      text_root: "Ordena las siguientes palabras para formar una oración que tenga sentido:",
      difficulty: this.questionForm.get('difficulty')?.value,
      type_question: "order_word",
      options: {
        select_mode: "",
        text_options: this.messyOptions,
        text_to_complete: "",
        hind: ""
      },
      correct_answer: {
        true_or_false: false,
        text_options: this.tidyOptions,
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
  iconDelete = iconos.faTrashAlt;
  iconAdd = iconos.faCirclePlus;
}
