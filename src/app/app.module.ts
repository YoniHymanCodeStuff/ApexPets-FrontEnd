import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import {  BsDatepickerConfig } from 'ngx-bootstrap/datepicker';import { AnimalsModule } from './Modules/animals.module';
import { AccountModule } from './Modules/account.module';
import { OrdersModule } from './Modules/orders.module';
import { ErrorsModule } from './Modules/errors.module';
import { SharedModule } from './Modules/shared.module';
import { CoreModule } from './Modules/core.module';
import { GalleryModule } from './Modules/gallery.module';
import { ContactFormComponent } from './Pages/contact-form/contact-form.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    AboutPageComponent,
  
  ],
  imports: [
   
    CommonModule,
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    AnimalsModule,
    AccountModule,
    OrdersModule,
    ErrorsModule,
    SharedModule,
    FormsModule,
    GalleryModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true,
    },
    {provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true,
    }
    ,
    {provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true,
    },
    BsDatepickerConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
