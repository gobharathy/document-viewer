import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthValidationServiceService } from './auth-validation-service.service';
import { BrowseComponent } from './browse/browse.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthValidationServiceService],
    children: [
      { path: 'browse', component: BrowseComponent },
      { path: '', redirectTo: 'browse', pathMatch: 'full' },
      { path: 'search', component: SearchComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
