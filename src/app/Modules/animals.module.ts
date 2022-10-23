import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageComponent } from 'src/app/Pages/category-page/category-page.component';
import { ItemPageComponent } from 'src/app/Pages/item page/item-page/item-page.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { EditItemPageComponent } from '../Pages/item page/edit-item-page/edit-item-page.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { DataEditorComponent } from '../Pages/data-editor/data-editor.component';
import { SharedModule } from './shared.module';
import { GalleryModule } from './gallery.module';


//this is a feature module, lazy loaded

const routes :Routes = [
  { path: '', component: CategoryPageComponent},
  {path:'edit/:item-id', component:EditItemPageComponent},
  {path: ':item-id', component: ItemPageComponent},
]
//{path: ':category-id/:item-id', component: ItemPageComponent},

@NgModule({
  declarations: [
    CategoryPageComponent,
    HomePageComponent,
    ItemPageComponent,
    EditItemPageComponent,
    DataEditorComponent,
  ],
  imports: [
  CommonModule,
  FormsModule,
  RouterModule.forChild(routes),
  PaginationModule.forRoot(),
  SharedModule,
  GalleryModule
  ],

  exports:[
    RouterModule,
    CategoryPageComponent,
    ItemPageComponent,
    PaginationModule,
    FormsModule,
    HomePageComponent,
    ItemPageComponent,
    EditItemPageComponent,
    DataEditorComponent,
  ]
})
export class AnimalsModule { }
