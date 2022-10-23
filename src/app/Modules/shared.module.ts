import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
 
    
  ],
  exports:
  [
    
    BsDropdownModule,
    NgxSpinnerModule,
    FileUploadModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextInputComponent,
    MatRadioModule
  ]

})
export class SharedModule { }
