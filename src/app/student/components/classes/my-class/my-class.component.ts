import { Component } from '@angular/core';
import { SpinnerComponent } from '../../../../shared-components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JoinToClassComponent } from '../../modals/join-to-class/join-to-class.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-class',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    FontAwesomeModule,
    JoinToClassComponent,
    HttpClientModule
  ],
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.css', '../../learn/modules/modules.component.css']
})
export class MyClassComponent {

  //Variables
  spinnerStatus: boolean = false;

  //constructor
  constructor(
    private modal: NgbModal
  ){}

  //ngOnInit
  ngOnInit(){
    this.spinnerStatus = true;
  }

  //Método que abre el listado de evaluaciones
  goToEvaluations(){
    //Redirigir a la ruta de evaluaciones y mostrar el componente
  }

  //Método que abre el modal para unirse a una clase
  openModalJoinToClass(joinToClass: any) {
    this.modal.open(joinToClass, { size: 'md', centered: true });
  }

  //Icons to use
  iconMyClass = iconos.faChalkboardUser;
  iconTitle = iconos.faCube;
  iconAdd = iconos.faCirclePlus;
  iconStudents = iconos.faUsers;
  iconViewDetails = iconos.faEye;
  iconLeaveClass= iconos.faSignOutAlt
}
