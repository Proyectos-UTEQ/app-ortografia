import { Component } from '@angular/core';
import * as AOS from 'aos';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-true-or-false',
  standalone: true,
  imports: [],
  templateUrl: './true-or-false.component.html',
  styleUrls: ['./true-or-false.component.css', './../select-with-sentence/select-with-sentence.component.css']
})
export class TrueOrFalseComponent {
  //Variables
  selectedOption: string = '';

  //Constructror
  constructor(
    private modulesService: ModulesService
  ) { }

  //ngOnInit()
  ngOnInit() {
    AOS.init();
  }

  //Método que selecciona la opción al hacer click
  selectOption(optionId: string) {
    const inputElement = document.getElementById(optionId) as HTMLInputElement;
    inputElement.click();
    this.selectedOption = optionId;
    this.modulesService.setSelectedOption(optionId);
  }
}
