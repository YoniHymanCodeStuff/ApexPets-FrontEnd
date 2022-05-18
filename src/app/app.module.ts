import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { UpperNavBarComponent } from './upper-nav-bar/upper-nav-bar.component';
import { LowerNavBarComponent } from './lower-nav-bar/lower-nav-bar.component';
import { CategoryPageComponent } from './Pages/category-page/category-page.component';
import { ItemPageComponent } from './Pages/item-page/item-page.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UpperNavBarComponent,
    LowerNavBarComponent,
    CategoryPageComponent,
    ItemPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//this allows making http calls. 
    // BrowserAnimationsModule,
    NgxNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
