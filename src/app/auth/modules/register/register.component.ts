import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';

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
    AOS.init();
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
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['"!@#$%^&*()_/+{}.:<>?-]).{8,20}$/), 
          Validators.minLength(8),
          Validators.maxLength(20) 
        ],
      ],
      birthDate: ['',
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

  //Método para determinar que la fecha seleccionada sea de almenos más de 5 años
  isFechaInvalida(): boolean {
    const fechaNacimientoControl = this.registerForm.get('birthDate');
    if (fechaNacimientoControl?.value) {
      const fechaNacimiento = new Date(fechaNacimientoControl?.value);
      const fechaActual = new Date();
      fechaActual.setFullYear(fechaActual.getFullYear() - 12)
      fechaActual.setHours(0, 0, 0, 0);
      const fechaMinima = new Date();
      const year = fechaMinima.getFullYear() - 100;
      fechaMinima.setFullYear(fechaMinima.getFullYear() - 100)
      fechaMinima.setHours(0, 0, 0, 0);
      return (fechaNacimiento > fechaActual) || (fechaNacimiento < fechaMinima);
    }
    return false;
  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  //Para deshabilitar la fecha
  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear() - 5;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear() - 100;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
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
