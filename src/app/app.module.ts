import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GuestsCustomerListComponent } from './components/guests-customer-list/guests-customer-list.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, GuestsCustomerListComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
