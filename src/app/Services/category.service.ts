import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { ICategory } from '../TemporaryFakeData/IGenus';
// import { Categories } from '../TemporaryFakeData/MockCategory';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // getCategory(catName:string): Observable<any|undefined>
  // {
    
  //   const category = Categories.find(x=> x.name==catName)
  //   //this function makes no sense unless categories are 
  //   //objects in their own right like I did with the front end data... 

  //   //var category;
  //   // this.http.get('https://localhost:5001/api/animals/categories').subscribe
  //   // (
  //   //   {
  //   //   next:(data)=>{category=data;},
  //   //   error:(err)=>{console.log(err)},
  //   //   complete:()=>{console.log('complete')}
  //   //   }
  //   // )
  //   return of(category); 
  // }

  //the problem may be caused by the end part being returned 
  //after the async data is retrieved 
  getCategories(): Observable<string[]|undefined>
  {
    var categories;
    this.http.get('https://localhost:5001/api/animals/categories').subscribe
    (
      {
      next:(data)=>{categories=data;},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log('got categories')}
      }
    )
    console.log(`the type is :${typeof categories}`)
    return of(categories);

    //something added
    
  }
}
