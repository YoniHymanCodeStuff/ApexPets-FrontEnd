import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { ICategory } from '../TemporaryFakeData/IGenus';


@Component({
  selector: 'app-upper-nav-bar',
  templateUrl: './upper-nav-bar.component.html',
  styleUrls: ['./upper-nav-bar.component.css']
})
export class UpperNavBarComponent implements OnInit {

  categories? : string[]; //prob a string[]
 

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.GetCategories();

    if(this.categories)
    {
    this.categories.forEach(element => {
      console.log(element)
    })}
    else{console.log('nope');}
  }


  GetCategories(){
    this.categoryService.getCategories()
    .subscribe(result=>this.categories = result);
  }

}
