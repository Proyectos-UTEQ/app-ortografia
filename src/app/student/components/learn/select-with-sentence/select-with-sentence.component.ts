import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModulesService } from '../../../services/modules.service';
import { QuestionI } from '../../../interfaces/lessons';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-select-with-sentence',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './select-with-sentence.component.html',
  styleUrl: './select-with-sentence.component.css'
})
export class SelectWithSentenceComponent {
  //Variables
  selectedOptionForColor: string = '';
  @Input() question: QuestionI = {} as QuestionI;
  @Output() singleAnswer: EventEmitter<string[]> = new EventEmitter<string[]>();
  arrayOptions = [
    { id: '1', idHTML: 'option1', label: 'Opción 1', optionNumber: 'a', selected: false },
    { id: '2', idHTML: 'option2', label: 'Opción 2', optionNumber: 'b', selected: false },
    { id: '3', idHTML: 'option3', label: 'Opción 3', optionNumber: 'c', selected: false },
  ];

  //Constructror
  constructor(
    private modulesService: ModulesService
  ) { }

  //ngOnInit()
  ngOnInit(){
    //Agrega las preguntas al array options
    if (this.question && this.question.options && this.question.options.text_options) {
      this.arrayOptions.forEach((option, index) => {
        option.label = this.question.options.text_options[index];
      });
    }
    AOS.init();
  }

  //Método que selecciona la opción al hacer click
  selectOption(optionId: string, optionLabel: string[]) {
    const inputElement = document.getElementById(optionId) as HTMLInputElement;
    inputElement.click();
    this.selectedOptionForColor = optionId;
    this.modulesService.setAnsweredOption(optionId);
    this.singleAnswer.emit(optionLabel);
  }
}

