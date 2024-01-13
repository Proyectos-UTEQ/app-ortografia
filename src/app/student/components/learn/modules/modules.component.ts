import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ModulesService } from '../../../services/modules.service';
import { ApiResponseModulesStudentI, DataModulesStudentI } from '../../../interfaces/modules';
import { ToastrModule } from 'ngx-toastr';
import { ToastAlertsService } from '../../../../auth/services/toast-alerts.service';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule
  ],
  providers: [
    ModulesService
  ],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
  //Variables
  arrayModulesStudent: DataModulesStudentI[] = []

  //Constructor
  constructor(
    private modulesStudentService: ModulesService,
    private toastr: ToastAlertsService
  ){}

  //ngOnInit()
  ngOnInit(){
    this.getAllModulesStudent(1,20,"title","asc");
  }

  /*Método que obtiene los headers*/
  getHeaders(){
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("typeUser", sessionStorage.getItem("typeUser"));
    return headers;
  }

  //Método que consume el servicio para obtener todos los módulos de la plataforma
  getAllModulesStudent(page: number, limit: number, sort: string, order: string) {
    //this.spinnerStatus = false;
    this.modulesStudentService.getAllModulesStudent(this.getHeaders(), page, limit, sort, order)
      .subscribe({
        next: (data: ApiResponseModulesStudentI) => {
          this.arrayModulesStudent = data.data;
          //this.spinnerStatus = true;
        },
        error: (error) => {
          //this.spinnerStatus = true;
          this.toastr.showToastError("Error", "No se pudo cargar la lista de categorías");
        }
      });
  }

  //Icons to use
  iconModules = iconos.faCubes;
}
