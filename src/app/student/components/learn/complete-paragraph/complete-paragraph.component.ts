import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as AOS from 'aos';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-complete-paragraph',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './complete-paragraph.component.html',
  styleUrls: ['./complete-paragraph.component.css', './../select-with-sentence/select-with-sentence.component.css']
})
export class CompleteParagraphComponent {
  //Variables
  selectedOption: string = '';
  completeWordForm!: FormGroup;

  //Constructror
  constructor(
    private formBuilder: FormBuilder,
    private modulesService: ModulesService
  ) { }

  //ngOnInit()
  ngOnInit() {
    this.createCompleteWordForm();
    AOS.init();
  }

  //Método que crea el formulario con el input
  createCompleteWordForm() {
    this.completeWordForm = this.formBuilder.group({
      wordToComplete: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]*$')
        ],
      ],
    });
  }

  //Método que verifica si ya se escribió algo en el input
  enableButton(){
    if(this.completeWordForm.value.wordToComplete != '')
      this.modulesService.setSelectedOption('option1');
  }
}
