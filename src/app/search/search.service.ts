import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from './document.model';
import {
  map, distinctUntilChanged, skip
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
      const pagination = { ..._state.pageSetting };
      this.documents = response.data;
      pagination.pageCount = Math.ceil(this.documents.length / 5);
      this.updateState({ ..._state, documents: this.documents, pageSetting: { ...pagination } });
    });
  }

  updatePage(currentPage: number) {
    this.updateState({ documents: [...this.documents], pageSetting: { ..._state.pageSetting, currentPage: currentPage } });
  }

  private updateState(state: SearchState) {
    const pagination = { ...state.pageSetting };
    const skip = (pagination.currentPage - 1) * pagination.pageSize;
    const take = skip + pagination.pageSize;
    state.documents = state.documents.slice(skip, take);
    this.store.next(_state = state);
  }
}