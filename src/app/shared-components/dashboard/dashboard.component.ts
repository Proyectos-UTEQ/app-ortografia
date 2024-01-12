import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardI } from '../interfaces/dashboard';
import { environment } from '../../../environments/environment';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  //Variables
  isDropdownActive: boolean[] = [false, false, false, false];
  optionsMenu: DashboardI [] = [];

  //constructor
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute
  ){}

  //ngOnInit()
  ngOnInit(){
    this.showHideChildsOption();
    this.showHideMenuProfile();
    this.showHideSidebar();
    this.detectedScreen();
    this.optionSelectedOnMenu();
    this.router.navigate(['options-home'], { relativeTo: this.routerActivated })

    if(sessionStorage.getItem("typeUser")==environment.STUDENT){
      this.optionsMenu.push({icon: this.iconPractice, optionName: 'Practicar', link: 'practice/options', status: true});
      this.optionsMenu.push({icon: this.iconPositions, optionName: 'Posiciones', link: 'positions/positions-table', status: true});
      this.optionsMenu.push({icon: this.iconMyClass, optionName: 'Mis clases', link: 'classes/my-class', status: true});
      this.optionsMenu.push({icon: this.iconChatIA, optionName: 'Chat IA', link: 'chat-ia', status: true});
      this.optionsMenu.push({icon: this.iconHelp, optionName: 'Ayuda', link: 'help', status: true});
      this.optionsMenu.push({icon: this.iconInformation, optionName: 'Acerca de', link: 'information', status: true});
    }
    else if(sessionStorage.getItem("typeUser")==environment.TEACHER){

    }
    else (sessionStorage.getItem("typeUser")==environment.ADMIN)
  }


  // Método que muestra y oculta los hijos de una opción del menú
  showHideChildsOption() {
    const allDropdown = document.querySelectorAll<HTMLDivElement>('#sidebar .side-dropdown');
    allDropdown.forEach((item: HTMLDivElement) => {
      const a = item.parentElement?.querySelector<HTMLAnchorElement>('a:first-child');
      a?.addEventListener('click', function (e: Event) {
        e.preventDefault();
        if (!item.classList.contains('active')) {
          allDropdown.forEach((i: HTMLDivElement) => {
            const aLink = i.parentElement?.querySelector<HTMLAnchorElement>('a:first-child');
            if (aLink)
              aLink.classList.remove('active');
            i.classList.remove('show');
          });
        }
        item.classList.toggle('active');
        item.classList.toggle('show');
      });
    });
  }

  toggleDropdown(index: number) {
    for (let i = 0; i < this.isDropdownActive.length; i++) {
      if (i !== index) {
        this.isDropdownActive[i] = false;
      }
    }
    this.isDropdownActive[index] = !this.isDropdownActive[index];
  }

  // Método que muestra y oculta el menú de la foto de perfil
  showHideMenuProfile() {
    const profile = document.querySelector<HTMLDivElement>('nav .profile');
    const imgProfile = profile?.querySelector<HTMLImageElement>('p');
    const dropdownProfile = profile?.querySelector<HTMLDivElement>('.profile-link');
    imgProfile?.addEventListener('click', function () {
      dropdownProfile?.classList.toggle('show');
    });
    window.addEventListener('click', function (e: MouseEvent) {
      if (e.target !== imgProfile) {
        if (e.target !== dropdownProfile) {
          if (dropdownProfile && dropdownProfile.classList.contains('show')) {
            dropdownProfile.classList.remove('show');
          }
        }
      }
    });
  }

  // Método que muestra y oculta el manú lateral del dashboard
  showHideSidebar() {
    const toggleSidebar = document.querySelector('nav .toggle-sidebar') as HTMLElement;
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const allSidebar = document.querySelectorAll<HTMLDivElement>('#sidebar .divider');

    if (sidebar.classList.contains('hide')) {
      allSidebar.forEach((item: HTMLDivElement) => {
        item.textContent = '-';
      });
    }
    else {
      allSidebar.forEach((item: HTMLDivElement) => {
        item.textContent = '-';
      });
    }
    toggleSidebar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    });
  }

  // Método que detecta el tamaño de la pantalla, para ocultar automáticamente el menú lateral
  detectedScreen() {
    window.addEventListener('resize', function () {
      const sidebar = document.getElementById('sidebar') as HTMLElement;
      const isMobile = window.innerWidth <= 767;
      if (isMobile) {
        sidebar?.classList.add('hide');
      } else {
        sidebar?.classList.remove('hide');
      }
    });
  }

  // Método que agrega o elimina la clase "active" de una opción del menú
  optionSelectedOnMenu() {
    const menuItems = document.querySelectorAll('.side-menu li');
    menuItems.forEach((menuItem) => {
      const link = menuItem.querySelector('a') as HTMLElement;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        menuItems.forEach((item) => {
          item.querySelector('a')?.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }

  //Método que cierra la sesión del usuario
  signOut() {
    //this.spinnerStatus = false;
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    setTimeout(() => {
      //this.spinnerStatus = true;
      this.router.navigateByUrl('auth/login');
    }, 2000);
  }

  //Icons to use
  iconBars = iconos.faBars;

  //ESTUDIANTE: iconos de las opciones del menú
  iconLearn = iconos.faHome;
  iconInformation = iconos.faInfoCircle;
  iconHelp = iconos.faQuestionCircle;
  iconArrowDown = iconos.faChevronDown;
  iconPractice = iconos.faFileLines;
  iconPositions = iconos.faUsers;
  iconMyClass = iconos.faChalkboardTeacher;
  iconChatIA = iconos.faChartSimple;

  //PROFESOR: iconos de las opciones del menú

  //ADMINISTRADOR: iconos de las opciones del menú

  //OPCIONES PERFIL: iconos de las opciones del menú en la foto de perfil
  iconProfile = iconos.faUserCircle;
  iconPassword = iconos.faLock;
  iconLogOut = iconos.faArrowRightFromBracket;
}
