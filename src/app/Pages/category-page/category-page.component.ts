import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ItemService } from 'src/app/Services/item.service';
// import { IAnimal } from 'src/app/TemporaryFakeData/IAnimal';
// import { ICategory } from 'src/app/TemporaryFakeData/IGenus';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  @Input() category?: string ;
  @Input() items? : any[];


  constructor( private route: ActivatedRoute,
    private categoryService:CategoryService, private itemService:ItemService) { }

  ngOnInit(): void {
    this.ChangeCategory();
    
  }

  ChangeCategory(){
    this.route.url.subscribe(url =>{
      this.GetCategory();
      this.GetItems();
 });
  } 

  GetCategory() {
    
    this.category = String(this.route.snapshot.paramMap.get('category-id'));

    // this.categoryService.getCategory(name)
    // .subscribe(categ => this.category = categ);
    
  }

  GetItems(){
    if(this.category)
    {
    this.itemService.getCategoryItems(this.category)
      .subscribe(catItems => this.items = catItems);
    }
  }

}
