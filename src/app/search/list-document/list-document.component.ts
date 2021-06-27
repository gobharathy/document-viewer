import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from '../document.model'
import { PageSetting } from '../page-setting.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  documents$: Observable<Document[]>;
  pageSetting$: Observable<PageSetting | undefined>;

  constructor(private searchService: SearchService) {
    this.documents$ = searchService.documents$;
    this.pageSetting$ = searchService.pageSetting$;
  }
  ngOnInit(): void {
  }

  changePage(currentPage: number): void {
    this.searchService.updatePage(currentPage);
  }

  counter(i: number): number[] {
    return new Array(i);
  }
}

