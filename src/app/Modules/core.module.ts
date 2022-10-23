import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UpperNavBarComponent } from '../upper-nav-bar/upper-nav-bar.component';
import { LowerNavBarComponent } from '../lower-nav-bar/lower-nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from '../upper-nav-bar/login-form/login-form.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    UpperNavBarComponent,
    LowerNavBarComponent,
    LoginFormComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxNavbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule,
    
  ],

  exports:[

    NgxNavbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    BsDropdownModule, 
    UpperNavBarComponent,
    LoginFormComponent,
    LowerNavBarComponent,
    RouterModule,
    
  ]
})
export class CoreModule { }
