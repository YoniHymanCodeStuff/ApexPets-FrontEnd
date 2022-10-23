import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { CartAnimal } from 'src/app/model_Interfaces/CartAnimal';
import { User } from 'src/app/model_Interfaces/User';
import { AccountService } from 'src/app/Services/account.service';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  currentUser$: Observable<User | null>;
  user: User | null;
  CartAnimals: CartAnimal[] = [];
  totalPrice: number = 0;

  // customer:Customer;

  constructor(private accountService: AccountService,
    private ordersService: OrdersService,
    private toastr: ToastrService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(u => this.user = u);
  }

  ngOnInit(): void {
    this.LoadSCItems();
    
  }

  RemoveItem(animal: CartAnimal) {
    if (this.user) {

      let cartItem = { id: animal.cartItemId, orderedAnimalId: animal.animalId };
      this.ordersService.RemoveFromCart(this.user.userName, cartItem).subscribe({


        error: err => { console.log(err) },
        complete: () => {
          const index = this.CartAnimals.indexOf(animal);
          this.CartAnimals.splice(index, 1);
          this.toastr.success("removed item from cart");
          this.updateTotalPrice();
          
        }
      });
    }
  }

  LoadSCItems() {

    if (this.user) {

      if (!this.user.isAdmin) {

        this.ordersService.GetCartAnimals().subscribe({

          next: result => { this.CartAnimals = result,
          this.updateTotalPrice() },
          error: err => { console.log(err) }
        });
      }
    }
  }

  Checkout() {
    if (this.user)
      this.ordersService.Checkout().subscribe({

        error: err => { console.log(err) },
        complete: () => {
          this.CartAnimals = [];
          this.updateTotalPrice();
          this.toastr.success("Your order has been successfully issued. Thank you for letting us supply your semi-legal animal needs! ");
        }
      })
  }

  TestButton(inp: string) {
    this.toastr.warning(inp);
  }

  updateTotalPrice() {
    var sum: number = 0;

    this.CartAnimals?.forEach(animal => {
      sum += animal.price
    });

    this.totalPrice = sum;
  }

}
