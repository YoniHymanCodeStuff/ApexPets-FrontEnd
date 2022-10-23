import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model_Interfaces/User';
import { AccountService } from 'src/app/Services/account.service';
import { take } from 'rxjs';
import { OrdersService } from 'src/app/Services/orders.service';
import { Order } from 'src/app/model_Interfaces/Order';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  user: User | null;
  orders: Order[];

  constructor(private accountService: AccountService, private ordersService: OrdersService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(u => this.user = u);
  }

  ngOnInit(): void {
    this.LoadOrders();
  }

  LoadOrders() {

    if (this.user) {
      if (!this.user.isAdmin) {

        this.ordersService.GetCustomerOrders().subscribe({

          next: result => { this.orders = result },
          error: err => { console.log(err) }

        });

      }
     
    }
    
  }


}
