import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from './document.model';
import {
  map, distinctUntilChanged
} from 'rxjs/operators';
import { PageSetting } from './page-setting.model';

export interface SearchState {
  documents: Document[];
  pageSetting: PageSetting;
}
let _state: SearchState = {
  documents: [],
  pageSetting: {
    pageCount: 0,
    currentPage: 1,
    pageSize: 5,
  },
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient) { }
  private store = new BehaviorSubject<SearchState>(_state);
  private state$ = this.store.asObservable();

  documents: Document[] = [];
  documents$: Observable<Document[]> = this.state$.pipe(map(s => s.documents), distinctUntilChanged());
  pageSetting$: Observable<PageSetting | undefined> = this.state$.pipe(map(state => state.pageSetting), distinctUntilChanged());

  load(searchText: string): void {
    this.httpClient.get('https://gorest.co.in/public-api/users').subscribe((response: any) => {
      this.documents = response.data;
      this.updateState({ documents: this.documents, pageSetting: { ..._state.pageSetting } });
      this.updatePage(1);
    });
  }

  updatePage(currentPage: number) {
    const pageSetting = { ..._state.pageSetting, currentPage };
    const pageCount = Math.ceil(this.documents.length / pageSetting.pageSize);
    const skip = (pageSetting.currentPage - 1) * pageSetting.pageSize;
    const take = skip + pageSetting.pageSize;
    const documents = this.documents.slice(skip, take);
    this.updateState({ documents: documents, pageSetting: { ...pageSetting, pageCount } });
  }

  private updateState(state: SearchState) {
    const localState = { ..._state, ...state };
    this.store.next(_state = localState);
  }
}