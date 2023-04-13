import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
