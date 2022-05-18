import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { IAnimal } from '../TemporaryFakeData/IAnimal';
// import { Animals } from '../TemporaryFakeData/MockAnimaldata';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {



  constructor(private http: HttpClient) { }

  private itemsUrl = '';//this is where I put the adress relative to the server api. 
  

  getItem(itemId:number): Observable<any|undefined>
  {
    var animal;

    // const item = Animals.find(x=> x.Id==itemId)
    this.http.get('https://localhost:5001/api/animals/' + itemId).subscribe
    (
      {
      next:(data)=>{animal=data;},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log('complete')}
      }
    )
    return of(animal); 
  }

 
  getCategoryItems(categoryName:string): Observable<any[]|undefined>
  {
    var CategoryAnimals;

    this.http.get('https://localhost:5001/api/animals/ByCategory/'+ categoryName).subscribe
    (
      {
      next:(data)=>{CategoryAnimals=data;},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log('complete')}
      }
    )
    //const items = Animals.filter(x=> x.category == categoryName)
    return of(CategoryAnimals); 
  }
}
