import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BrowseComponent } from './browse/browse.component';
import { HeaderComponent } from './header/header.component';
import { ListDocumentComponent } from './search/list-document/list-document.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent,
    BrowseComponent,
    HeaderComponent,
    ListDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
