import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-select-several-correct',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './select-several-correct.component.html',
  styleUrls: ['./select-several-correct.component.css', './../select-with-sentence/select-with-sentence.component.css']
})
export class SelectSeveralCorrectComponent {

  //Variables
  selectedOptions: string[] = [];
  options = [
    { id: '1', idHTML: 'option1', label: 'Opción 1', optionNumber: 'a', selected: false },
    { id: '2', idHTML: 'option2', label: 'Opción 2', optionNumber: 'b', selected: false },
    { id: '3', idHTML: 'option3', label: 'Opción 3', optionNumber: 'c', selected: false },
    { id: '4', idHTML: 'option4', label: 'Opción 4', optionNumber: 'd', selected: false },
    { id: '5', idHTML: 'option5', label: 'Opción 5', optionNumber: 'e', selected: false },
    { id: '6', idHTML: 'option6', label: 'Opción 6', optionNumber: 'f', selected: false },
  ];

  //ngOnInit()
  ngOnInit(){
    AOS.init();
  }

  //Método que agrega las opciones seleccionadas al array selectedOptions o las quita si ya existen
  toggleOption(optionId: string): void {
    const selectedOption = this.options.find(option => option.idHTML === optionId);
    if (selectedOption) {
      selectedOption.selected = !selectedOption.selected;
      // Actualiza el estado de selectedOptions basado en options
      this.selectedOptions = this.options
        .filter(option => option.selected)
        .map(option => option.idHTML);
    }
  }
}
