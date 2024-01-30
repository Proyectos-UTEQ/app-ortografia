import { Component } from '@angular/core';
import * as AOS from 'aos';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-select-with-sentence',
  standalone: true,
  imports: [],
  templateUrl: './select-with-sentence.component.html',
  styleUrl: './select-with-sentence.component.css'
})
export class SelectWithSentenceComponent {
  
  //Variables
  selectedOption: string = '';

  //Constructror
  constructor(
    private modulesService: ModulesService
  ) { }

  //ngOnInit()
  ngOnInit(){
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

