import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-complete-paragraph',
  standalone: true,
  imports: [],
  templateUrl: './complete-paragraph.component.html',
  styleUrls: ['./complete-paragraph.component.css', './../select-with-sentence/select-with-sentence.component.css']
})
export class CompleteParagraphComponent {
  //Variables
  selectedOption: string = '';

  //ngOnInit()
  ngOnInit(){
    AOS.init();
  }
}
