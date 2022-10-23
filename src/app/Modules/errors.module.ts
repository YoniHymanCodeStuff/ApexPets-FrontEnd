import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../Pages/not-found/not-found.component';
import { TestErrorsComponent } from '../errors/test-errors/test-errors.component';
import { ServerErrorComponent } from '../Pages/server-error/server-error.component';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [    
    NotFoundComponent,
    TestErrorsComponent,
    ServerErrorComponent,],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  exports:[
    NotFoundComponent,
    TestErrorsComponent,
    ServerErrorComponent
  ]
})
export class ErrorsModule { }
