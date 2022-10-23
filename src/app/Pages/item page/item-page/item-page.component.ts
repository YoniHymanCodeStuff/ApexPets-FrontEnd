import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/model_Interfaces/Animal';
import { CategoryService } from 'src/app/Services/category.service';
import { AnimalService } from 'src/app/Services/Animal.service';
import { AccountService } from 'src/app/Services/account.service';
import {take } from 'rxjs';
import { User } from 'src/app/model_Interfaces/User';
import { OrdersService } from 'src/app/Services/orders.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  user:User|null;
  @Input() currentAnimal?: Animal;
  
  constructor(private route: ActivatedRoute,
     private animalService:AnimalService,private categoryService:CategoryService,
     private accountService:AccountService, private orderService:OrdersService,
     private toastr:ToastrService ) {
      this.accountService.CurrentUser$.pipe(take(1)).subscribe(u => this.user = u);
      }


  ngOnInit(): void {
    this.GetItem();
    
  }

  GetItem() : void {
    const id = 
    Number(this.route.snapshot.paramMap.get('item-id'));

    this.animalService.getAnimal(id)
    .subscribe(animal => this.currentAnimal = animal);
  }

  AddToCart()
  {
    if(this.user && this.currentAnimal)
    this.orderService.AddToCart(this.user?.userName,this.currentAnimal?.id)
    .subscribe(
      {
      
      error:(err)=>{console.log(err)},
      complete:()=>{ this.toastr.success("Added item to cart.");}
      }
    );  
  }

}
