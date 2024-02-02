import { ModulesService } from './../../../services/modules.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { QuestionI } from '../../../interfaces/lessons';
import * as AOS from 'aos';

@Component({
  selector: 'app-order-words',
  standalone: true,
  imports: [
    CdkDropList, CdkDrag
  ],
  templateUrl: './order-words.component.html',
  styleUrl: './order-words.component.css'
})
export class OrderWordsComponent {
  //Variables
  @Input() question: QuestionI = {} as QuestionI;
  @Output() orderedWords: EventEmitter<string[]> = new EventEmitter<string[]>();
  arrayWords: string[] = [];

  //Constructor
  constructor(
    private modulesService: ModulesService
  ){}
  
  //ngOnInit
  ngOnInit(){
    this.modulesService.setAnsweredOption('1');
    this.arrayWords = this.question.options.text_options;
    AOS.init();
  }

  //Método con el evento drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayWords, event.previousIndex, event.currentIndex);
    this.orderedWords.emit(this.arrayWords);
  }
}
