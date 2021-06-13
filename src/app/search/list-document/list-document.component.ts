import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface Document {
  name: string;
  date: Date
}

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  documents$: Observable<{ name: string, date: Date }[]> = of([
    {
      name: 'Document1',
      date: new Date(),
    },
    {
      name: 'Document2',
      date: new Date(),
    }
  ]);

  constructor() { }
  ngOnInit(): void {
  }

}
