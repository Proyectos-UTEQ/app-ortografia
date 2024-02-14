import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import { FormControl, FormRecord, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-words',
  standalone: true,
  imports: [
    FontAwesomeModule,
    SpinnerComponent,
    ReactiveFormsModule,
    NzFormModule
  ],
  templateUrl: './order-words.component.html',
  styleUrls: ['./order-words.component.css', '../single-select/single-select.component.css']
})
export class OrderWordsComponent {

  //Variables
  spinnerStatus: boolean = false;
  validateForm: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  //constructor
  constructor(
    private fb: NonNullableFormBuilder
  ) { }

  //ngOnInit
  ngOnInit(): void {
    this.spinnerStatus = true;
    this.addField();
  }

  //Método que agrega las filas
  addField(e?: MouseEvent): void {
    e?.preventDefault();
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const controlInstance = `option ${id}`;
    const control = {
      id,
      controlInstance
    };
    this.listOfControl.push(control);
    this.validateForm.addControl(
      controlInstance,
      this.fb.control('', Validators.required)
    );
  }

  //Método que elimina las filas
  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  //Método que manda a registrar la pregunta
  registerQuestion() {
    //Aquí se obtiene el array con las opciones
    const formValues = this.listOfControl.map(control => this.validateForm.get(control.controlInstance)?.value);
    console.log(formValues);
  }


  //Icons to use
  iconCube = iconos.faCube;
  iconIA = iconos.faWandMagicSparkles;
  iconDelete = iconos.faTrashAlt;
  iconAdd = iconos.faCirclePlus;
}
