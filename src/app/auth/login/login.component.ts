import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';

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
  ) { }

  //NgOnInit()
  ngOnInit() {
    AOS.init();
  }

  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  //Método que verifica el icono de password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método que inicia la sesión del usuario
  loginUser() {
  }

  // Método que redirige al módulo de recuperar la contraseña
  goToForgotPassword() {
    this.router.navigateByUrl("auth/forgot-password");
  }

  // Método que redirige al formulario de registro de usuario
  goToRegisterForm() {
    this.router.navigateByUrl("auth/register");
  }


  /*Icons to use*/
  iconForgotPassword = iconos.faLock;
  iconViewPassword = iconos.faEye;
  iconHidePassword = iconos.faEyeSlash;
  iconMoreInformation = iconos.faInfoCircle;
}
