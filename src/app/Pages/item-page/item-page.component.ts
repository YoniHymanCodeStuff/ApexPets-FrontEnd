import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ItemService } from 'src/app/Services/item.service';

//import { IAnimal } from 'src/app/TemporaryFakeData/IAnimal';
//import { ICategory } from 'src/app/TemporaryFakeData/IGenus';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
     private itemService:ItemService,private categoryService:CategoryService ) { }

  @Input() currentAnimal?: any;
  // @Input() category?: ICategory;

  ngOnInit(): void {
    this.GetItem();
    // this.GetCategory();
  }

  GetItem() : void {
    const id = 
    Number(this.route.snapshot.paramMap.get('item-id'));

    this.itemService.getItem(id)
    .subscribe(animal => this.currentAnimal = animal);
  }

  // GetCategory() {
    
  //   const name = String(this.route.snapshot.paramMap.get('category-id'));

  //   this.categoryService.getCategory(name)
  //   .subscribe(categ => this.category = categ);
    
  // }

}
