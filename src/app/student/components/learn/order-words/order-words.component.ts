import { Component } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

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
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    console.log("Obteniendo array a mover")
    console.log(this.timePeriods);
  }
}
