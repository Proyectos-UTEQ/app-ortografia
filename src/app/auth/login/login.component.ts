import { AppComponent } from './../../app.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  //Variables
  showPassword: boolean = false;

  //Fomrulario de login
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  //Constructor
  constructor(
    private router: Router
  ){}

  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método que redirige al módulo de recuperar la contraseña
  goToForgotPassword() {
  }

  // Método que redirige al formulario de registro de usuario
  goToRegisterForm() {
    this.router.navigateByUrl("auth/register");
  }

  // Método que inicia la sesión del usuario
  loginUser(){
  }

  /*Icons to use*/
  iconForgotPassword = iconos.faLock;
  iconViewPassword = iconos.faEye;
  iconHidePassword = iconos.faEyeSlash;
  iconMoreInformation = iconos.faInfoCircle;
}
