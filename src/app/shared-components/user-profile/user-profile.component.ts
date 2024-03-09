import { Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { UserLoginI } from '../../auth/interfaces/login';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    SpinnerComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  //Variables
  spinnerStatus: boolean = false;
  infoUser: UserLoginI = {} as UserLoginI;

  isEdit: boolean = false;
  userProfileForm!: FormGroup;

  //constructor
  constructor(
    private formBuilder: FormBuilder
  ){}

  //ngOnInit
  ngOnInit(){
    this.spinnerStatus = true;
    this.createUserProfileForm();
    this.infoUser = JSON.parse(sessionStorage.getItem('infoUser') || '{}');
    this.fillInputFields();
  }

  //Método que crea el formulario para crear un módulo
  createUserProfileForm() {
    this.userProfileForm = this.formBuilder.group({
      first_name: ['',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ!@#$%^&*(),.: ]*$")],
      ],
      last_name: ['',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ!@#$%^&*(),.: ]*$")],
      ],
      whatsapp: ['', Validators.required],
      birth_date: ['', Validators.required],
      email: [''],
      telegram: ['', Validators.required],
    });
  }

  //Método que llena la información del usuario en los campos
  fillInputFields(){
    this.userProfileForm.get('first_name')?.setValue(this.infoUser.first_name);
    this.userProfileForm.get('last_name')?.setValue(this.infoUser.last_name);
    this.userProfileForm.get('whatsapp')?.setValue(this.infoUser.whatsapp);
    this.userProfileForm.get('birth_date')?.setValue(this.infoUser.birth_date);
    this.userProfileForm.get('email')?.setValue(this.infoUser.email);
    this.userProfileForm.get('telegram')?.setValue(this.infoUser.telegram);
  }

  //Método que cambia los botones para editar la información
  changeEdit(){
    if(this.isEdit)
      this.isEdit = false;
    else
      this.isEdit = true; 
  }

  //Método que guarda la información del usuario luego de editarla en los campos
  editUserInformation(){
    //COnsumir servicio para editae
  }

  //Icons to use
  iconMyProfile = iconos.faUserAlt;
  iconVerified = iconos.faCircleCheck;
  iconInformation = iconos.faList;
}
