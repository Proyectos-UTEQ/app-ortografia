import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent {
  //Variables
  showPassword: boolean = false;
  optionTypeUserSelected: string = "";
  registerForm!: FormGroup;

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  //ngOnInit
  ngOnInit() {
    this.createRegisterForm();
  }

  //Método que crea el formulario de registro de usuario
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern(/^(?!.*([._-]{2,}))[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ],
      ],
      password: ['',
        [
          Validators.required
        ],
      ],
      birthdate: ['',
        [
          Validators.required
        ],
      ],
      typeUser: ['',
        [
          Validators.required
        ],
      ],
    });
  }


  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  // Método que redirige al login
  goToLoginForm() {
    this.router.navigateByUrl("auth/login");
  }

  // Método que registra un nuevo usuario
  registerNewUser() {
  }

  /*Icons to use*/
  iconForgotPassword = iconos.faLock;
  iconViewPassword = iconos.faEye;
  iconHidePassword = iconos.faEyeSlash;
  iconMoreInformation = iconos.faInfoCircle;
}
