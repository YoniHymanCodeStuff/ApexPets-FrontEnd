import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderViewerComponent } from 'src/app/Pages/Admin-order-Manager/order-viewer.component';
import { OrdersComponent } from 'src/app/Pages/orders/orders.component';
import { ShoppingCartComponent } from '../Pages/shopping-cart/shopping-cart.component';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderViewerComponent,
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    OrdersComponent,
    OrderViewerComponent,
    ShoppingCartComponent
  ]
})
export class OrdersModule { }
