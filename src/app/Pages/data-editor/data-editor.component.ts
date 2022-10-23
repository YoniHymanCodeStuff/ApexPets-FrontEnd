import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/model_Interfaces/Animal';
import { Pagination } from 'src/app/model_Interfaces/Pagination';
import { AnimalService } from 'src/app/Services/Animal.service';
import { Table_Schema } from './TableSchema';
import { tap } from 'rxjs';
import { AnimalQueryParams } from 'src/app/model_Interfaces/AnimalQueryParams';
import { Sort } from '@angular/material/sort';
import { CategoryService } from 'src/app/Services/category.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true,insideClick:true } }]

})
export class DataEditorComponent implements OnInit {

  animals: Animal[];
  pagination: Pagination;
  // pageNumber: number = 1;
  // pageSize: number = 5;
  queryParams : AnimalQueryParams = new AnimalQueryParams();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  categories:string[];
 


  //prob should loop through properties to et this... 
  //_dataSource: Animal[];
  tableSchema: any = Table_Schema;
  displayedColumns: string[] = Table_Schema.map((col) => col.key);

  constructor(private animalService: AnimalService,
     private toastr: ToastrService,
    private categoryService:CategoryService,
    private router:Router) { 
    this.queryParams.pageNumber = 1;
    this.queryParams.itemsPerPage = 5; 
  }

  ngOnInit(): void {
     this.LoadAnimals();
     this.LoadCategories();
    }

  
    LoadCategories(){
      this.categoryService.getCategories()
      .subscribe({
        next:result=>{this.categories = result},
        error:error=>{console.log(error)}
        })
    }



  LoadAnimals() {
    // console.log(JSON.stringify(this.queryParams))
    this.animalService.GetPaginatedAnimals(this.queryParams).subscribe({
      next: data => {
        this.animals = data.result;
        // console.log(JSON.stringify(this.animals));
        this.pagination = data.pagination
      }
    });
  }



  SortChange(sorting:Sort){
    this.queryParams.OrderBy = sorting.active;
    this.queryParams.OrderDirection = sorting.direction;
    this.LoadAnimals();
  }

  ClearSearch(SearchTerm:string){
    if(SearchTerm == '')
    this.FireSearch(SearchTerm);
  }

    FireSearch(SearchTerm:string){
    this.queryParams.SearchString = SearchTerm;
    this.LoadAnimals();
  }
  
  pageChanged(page:any){
    
    this.queryParams.pageNumber = page.pageIndex +1 ;
    this.queryParams.itemsPerPage = page.pageSize;
    this.LoadAnimals();
  }

  //need to change name for clarity
  updateItem(animal: Animal) {
    if (animal.id) {
      this.UpdateAnimal(animal);
    }

    else {
      this.NewAnimal(animal)
    }
   

  }

  ArchiveAnimal(id: number) {
    //need to add front end removal updating.
    this.animalService.ArchiveItem(id).subscribe({
      error: (err) => { console.log(err) },
      complete: () => {
        this.toastr.success("Product has been removed from website and added to archives");
        this.LoadCategories();
        this.LoadAnimals();
      }
    })
  }

  UpdateAnimal(animal: Animal) {
    this.animalService.UpdateItem(animal).subscribe({
      error: (err) => { console.log(err) },
      complete: () => {  this.LoadCategories();
        this.LoadAnimals();
        this.toastr.success("Product updated") }
    });
  }

  NewAnimal(animal: Animal) {
    console.log(JSON.stringify(animal));
    this.animalService.CreateItem(animal).subscribe
      ({
        error: (err) => { console.log(err) },
        complete: () => {
          this.toastr.success("Product Added");
          this.LoadCategories();
          this.LoadAnimals();
        }
      });
    //this should auto-copy the right fields...kinda lazy
  }

  AddRow() {
    //pretty sure this is a dumb way to do this...
    const newRow: any = {
      name: '',
       species: '',
      category: '',
      required_Habitat: '',
      description: '',
      images: [],
      price: 0,
      isEdit: true
    }
    this.animals = [newRow, ...this.animals];
  }





  DeleteAnimal(id: number) {
    //need to take it out of the local one too. maybe on completion.
    if (confirm("You are about to delete an animal from the database. This will delete all records of orders including this animal. Do you still want to continue?")) {
      this.animalService.DeleteItem(id).subscribe({
        error: (err) => { console.log(err) },
        complete: () => {
          this.toastr.success("Product Deleted");

          this.LoadAnimals();
          
        }
      })
    }
    else {
      this.toastr.success("Deletion Aborted")
    }
  }

  
  SaveAll() {

  }

}
