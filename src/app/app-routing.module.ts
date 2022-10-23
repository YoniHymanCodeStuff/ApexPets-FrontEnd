import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { AdminCreationFormComponent } from './Pages/admin-creation-form/admin-creation-form.component';
import { AdminProfileComponent } from './Pages/admin-profile/admin-profile.component';
import { CategoryPageComponent } from './Pages/category-page/category-page.component';
import { ContactFormComponent } from './Pages/contact-form/contact-form.component';
import { DataEditorComponent } from './Pages/data-editor/data-editor.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ItemPageComponent } from './Pages/item page/item-page/item-page.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { OrderViewerComponent } from './Pages/Admin-order-Manager/order-viewer.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';
import { ServerErrorComponent } from './Pages/server-error/server-error.component';
import { ShoppingCartComponent } from './Pages/shopping-cart/shopping-cart.component';
import { AdminAuthGuardService } from './Services/admin-auth-guard.service';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomePageComponent,pathMatch:'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'registration', component: RegistrationPageComponent, pathMatch:'full'},
  {path:'errors',component:TestErrorsComponent},
  { path: 'not-found',  component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'about',component:AboutPageComponent},
  {path:'contact',component:ContactFormComponent},
  

  {path:'animals/:category-id',loadChildren: ()=> import('./Modules/animals.module')
  .then(m=>m.AnimalsModule)},

  
  {path:'', canActivate:[AuthGuardService],
  runGuardsAndResolvers:'always',
  children:[
    {path: 'profile',component: ProfilePageComponent,canDeactivate:[PreventUnsavedChangesGuard]},
    {path:'shopping-cart',component:ShoppingCartComponent},
    {path:'orders',component:OrdersComponent}
  ]
  },

  {path:'', canActivate:[AdminAuthGuardService],
  runGuardsAndResolvers:'always',
  children:[
  {path:'order-manager',component:OrderViewerComponent},
  {path:'data-editor', component:DataEditorComponent},
  {path:'Add-Admin', component:AdminCreationFormComponent},
  {path:'admin-profile', component:AdminProfileComponent}
  ]},
  
  
  { path: '**',  component:NotFoundComponent,pathMatch:'full' }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
