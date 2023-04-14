import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import the FormsModule here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardianpageComponent } from './guardianpage/guardianpage.component';
import { GuardianselectComponent } from './guardianselect/guardianselect.component';
import { AccountsearchComponent } from './accountsearch/accountsearch.component';

@NgModule({
  declarations: [
    AppComponent,
    GuardianpageComponent,
    GuardianselectComponent,
    AccountsearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
