import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterUserGit } from './components/pipes/filter-userGit.pipe';
import { UsersGitHubComponent } from './components/users-git-hub/getUsers/users-git-hub.component';
@NgModule({
  declarations: [
    AppComponent,
    FilterUserGit,
    UsersGitHubComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
