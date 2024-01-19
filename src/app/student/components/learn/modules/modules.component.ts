import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModulesService } from '../../../services/modules.service';
import { ApiResponseModulesStudentI, DataModulesStudentI, DetailsPage } from '../../../interfaces/modules';
import { ToastrModule } from 'ngx-toastr';
import { ToastAlertsService } from '../../../../auth/services/toast-alerts.service';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import { SubscribedModulesService } from '../../../services/subscribed-modules.service';
import { ApiResponseSubscribedModulesI } from '../../../interfaces/subscribed-modules';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { SweetAlertsConfirm } from '../../../../shared-components/alerts/confirm-alerts.component';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule,
    SpinnerComponent,
  ],
  providers: [
    ModulesService,
    SubscribedModulesService,
    SweetAlertsConfirm
  ],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
  //Variables
  arrayModulesStudent: ApiResponseModulesStudentI = {} as ApiResponseModulesStudentI;
  arraySubscribedModulesStudent: ApiResponseSubscribedModulesI = {} as ApiResponseSubscribedModulesI;
  spinnerStatus: boolean = false;
  totalPage: number = 0;
  arrayPaginator: number[] = [];
  currentPage: number = 1;
  statusFilter: string = "subscribed";

  //Constructor
  constructor(
    private allModulesService: ModulesService,
    private modulesSuscribedStudent: SubscribedModulesService,
    private toastr: ToastAlertsService,
    private sweetAlerts: SweetAlertsConfirm
  ) { }

  //ngOnInit()
  ngOnInit() {
    this.spinnerStatus = true;
    this.getModulesSubscribedStudent(this.currentPage, 6, "title", "asc");
  }

  /*Método que obtiene los headers*/
  getHeaders() {
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("typeUser", sessionStorage.getItem("typeUser"));
    return headers;
  }

  //Método que consume el servicio para obtener todos los módulos de la plataforma
  getAllModulesStudent(page: number, limit: number, sort: string, order: string) {
    this.spinnerStatus = false;
    this.allModulesService.getAllModulesStudent(this.getHeaders(), page, limit, sort, order)
      .subscribe({
        next: (data: ApiResponseModulesStudentI) => {
          this.arrayModulesStudent = data;
          this.totalPage = data.details.total_page;
          this.setPaginator();
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.toastr.showToastError("Error", "No se pudo cargar el listado de módulos");
        }
      });
  }

  //Método que consume el servicio para obtener los módulos a los que el estudiante está suscrito
  getModulesSubscribedStudent(page: number, limit: number, sort: string, order: string) {
    this.spinnerStatus = false;
    this.modulesSuscribedStudent.getModulesSubscribedStudent(this.getHeaders(), page, limit, sort, order)
      .subscribe({
        next: (data: ApiResponseSubscribedModulesI) => {
          this.arrayModulesStudent = data;
          this.totalPage = data.details.total_page;
          this.setPaginator();
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.toastr.showToastError("Error", "No se pudo cargar el listado de módulos suscritos");
        }
      });
  }

  //Método que cambia el filtro entre todos lo módulos y los módulos suscritos
  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "all") {
      this.arrayModulesStudent = {} as ApiResponseModulesStudentI;
      this.statusFilter = "all";
      this.getAllModulesStudent(1, 6, "title", "asc");
    }
    else if (value === "subscribed") {
      this.arraySubscribedModulesStudent = {} as ApiResponseSubscribedModulesI;
      this.statusFilter = "subscribed";
      this.getModulesSubscribedStudent(1, 6, "title", "asc");
    }
  }

  //Para la paginación
  setPaginator() {
    this.arrayPaginator = [];
    for (let i = 0; i < this.totalPage; i++) {
      this.arrayPaginator.push(i + 1);
    }
  }

  // Método para manejar el cambio de página
  pageChanged(page: number) {
    this.currentPage = page;
    this.getAllModulesStudent(this.currentPage, 6, "title", "asc");
  }

  //Método que muestra un alert para preguntar si desea practiar en el módulo
  showAlertPractice(nameModule: string){
    this.sweetAlerts.alertConfirmCancelQuestion("Nueva práctica", "¿Deseas practicar ahora en el módulo \"" + nameModule + "\"?").then(respuesta => {
      if (respuesta.value == true) {
        this.spinnerStatus = false;
        //Redirigir al componente de teoría
      }
    });
  }

  //Método que muestra un alert para preguntar si desea suscribirse a un curso
  showAlertSuscribe(nameModule: string){
    this.sweetAlerts.alertConfirmCancelInformation("Módulo disponible", "Actualmente no te encuestras suscrito en el módulo de \"" + nameModule + "\" ¿Deseas suscribirte ahora?").then(respuesta => {
      if (respuesta.value == true) {
        this.spinnerStatus = false;
        //Consurmir servicio para suscribirse al módulo
      }
    });
  }

  //Icons to use
  iconModules = iconos.faCubes;
  iconAdd = iconos.faPlusCircle;
}
