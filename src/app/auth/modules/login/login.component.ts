import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ApiResponseLogin } from '../../interfaces/login';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../../environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, HttpClientModule, ToastrModule],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  //Variables
  showPassword: boolean = false;
  spinnerStatus: boolean = false;

  //Fomrulario de login
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  //Constructor
  constructor(
    private router: Router,
    private api: LoginService,
    private toastr: ToastrService
  ) { }

  //NgOnInit()
  ngOnInit() {
    AOS.init();
    this.spinnerStatus = true;
  }

  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  //Método que verifica el icono de password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /*Obtiene y retorna los headers*/
  getHeaders() {
    let headers = new Map();
    headers.set("email", this.loginForm.value.email);
    headers.set("password", this.loginForm.value.password);
    return headers;
  }

  // Método que inicia la sesión del usuario
  loginUser() {
    if (this.loginForm.valid) {
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
  
      this.api.loginUser(body)
        .subscribe({
          next: (res: ApiResponseLogin) => {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("typeUser", res.user.type_user);
  
            if (res.user.type_user == environment.STUDENT) {
              console.log(res);
              this.spinnerStatus = true;
              this.router.navigateByUrl('/student/home/dashboard');
              this.showToastSuccess("Inicio de sesión exitoso", "Bienvenido")
            } else if (res.user.type_user === environment.TEACHER) {
              this.router.navigateByUrl('/teacher/home/dashboard');
              this.showToastSuccess("Bienvenido de nuevo!", "Profesor")
            } else if (res.user.type_user === environment.ADMIN) {
              this.router.navigateByUrl('/student/home/dashboard');
              this.showToastSuccess("Bienvenido de nuevo!", "Administrador")
            }
          },
          error: (error) => {
            console.error(error);
            this.spinnerStatus = true;
            this.showToastError("Error", "Credenciales incorrectas");
          }
        });
    } else {
      this.spinnerStatus = true;
      this.showToastError("Error", "Primero debe ingresar sus credenciales de acceso");
    }
  }

  // Método que redirige al módulo de recuperar la contraseña
  goToForgotPassword() {
    this.router.navigateByUrl("auth/forgot-password");
  }

  // Método que redirige al formulario de registro de usuario
  goToRegisterForm() {
    this.router.navigateByUrl("auth/register");
  }

  // Método que muestra un toast con mensaje de ÉXITO
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  // Método que muestra un toast con mensaje de ERROR
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }


  /*Icons to use*/
  iconForgotPassword = iconos.faLock;
  iconViewPassword = iconos.faEye;
  iconHidePassword = iconos.faEyeSlash;
  iconMoreInformation = iconos.faInfoCircle;
}
