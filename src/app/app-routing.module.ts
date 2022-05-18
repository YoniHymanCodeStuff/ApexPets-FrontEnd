import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './Pages/category-page/category-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ItemPageComponent } from './Pages/item-page/item-page.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: ':category-id', component: CategoryPageComponent},
  {path: ':category-id/:item-id', component: ItemPageComponent},
   
  
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component:NotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
