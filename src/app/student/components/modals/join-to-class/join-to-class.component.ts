import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-join-to-class',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ToastrModule,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  templateUrl: './join-to-class.component.html',
  styleUrls: ['./join-to-class.component.css', '../subscribe-to-module/subscribe-to-module.component.css']
})
export class JoinToClassComponent {
  //Variables
  codeForm!: FormGroup;
  spinnerStatus: boolean = false;

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    // private toastr: ToastrService,
    private formBuilder: FormBuilder,
    // private modules: ModulesComponent,
    // private joinToClassService: JoinToClassService
  ) { }

  //ngOnInit()
  ngOnInit() {
    this.spinnerStatus = true;
    this.createCodeForm();
  }

  //Método que crea el formulario con el campo de código
  createCodeForm() {
    this.codeForm = this.formBuilder.group({
      codeClass: ['', Validators.required],
    });
  }

  //Método que consume el servicio para que el estudiante se suscriba a un módulo{
  joinToClass() {
    //   this.spinnerStatus = false;
    //   let body: JoinToClassI = {
    //     code: this.codeForm.get('codeClass')?.value
    //   }
    //   this.joinToClassService.joinToClass(this.modules.getHeaders(), body).subscribe(
    //     (data: ApiResponseJoinToClass) => {
    //       this.spinnerStatus = false;
    //       if(data.status == 'success'){
    //         this.spinnerStatus = true;
    //         this.modal.dismissAll();
    //         this.toastr.success("Se ha unido correctamente a su clase", "¡Éxito!");
    //       }
    //       else{
    //         this.spinnerStatus = true;
    //         this.toastr.error("Código incorrecto o la clase no existe", "¡Error!");
    //       }
    //     },
    //     (error: any) => {
    //       this.spinnerStatus = true;
    //       this.modal.dismissAll();
    //       this.toastr.error(error.error.message, "¡Error!");
    //     }
    //   );
  }

  //Icons to use
  codeClass = iconos.faChalkboardUser;
}
