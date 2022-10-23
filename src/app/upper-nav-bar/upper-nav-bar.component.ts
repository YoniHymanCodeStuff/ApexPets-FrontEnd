import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../Services/category.service';

import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Services/account.service';
import { take } from 'rxjs';
import { User } from '../model_Interfaces/User';

@Component({
  selector: 'app-upper-nav-bar',
  templateUrl: './upper-nav-bar.component.html',
  styleUrls: ['./upper-nav-bar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true,insideClick:true } }]

})
export class UpperNavBarComponent implements OnInit {

  categories? : string[]|null; 
  user :User|null;  


  constructor(private categoryService:CategoryService,
     private toast:ToastrService, 
     private accountService:AccountService) { 
    this.accountService.CurrentUser$.subscribe(u => this.user = u);
      
  }

  ngOnInit() {       
    this.GetCategories();
    this.categoryService.categories$.subscribe(x=>this.categories = x);
  }


  GetCategories(){
    this.categoryService.getCategories()
    .subscribe({
      next:result=>{this.categories = result},
      error:error=>{console.log(error)}
      
    })
    }


    

  


}

