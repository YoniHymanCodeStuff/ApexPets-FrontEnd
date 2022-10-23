import { Injectable } from '@angular/core';
import {  Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Animal } from '../model_Interfaces/Animal';
import { SetPhoto } from '../model_Interfaces/SetPhoto';
import { PaginationResult } from '../model_Interfaces/Pagination';
import { AnimalCreationData } from '../model_Interfaces/AnimalCreationData';
import {AnimalQueryParams} from '../model_Interfaces/AnimalQueryParams'
import { PaginationService } from './pagination.service';
import { Image } from '../model_Interfaces/Image';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {


  private baseUrl = environment.apiUrl + 'animals/';

    

  centralAnimalCache :Animal[] = [];
  allIdsStored : number[] = [];
  cachedQueries = new Map<string, PaginationResult<number[]>>(); 

  
 
  constructor(private http: HttpClient, private paginationService:PaginationService) { }



  getAnimal(animalId: number): Observable<any | undefined> {


    if(this.allIdsStored.includes(animalId))
    {
      return of(this.centralAnimalCache.find(x=>x.id==animalId));
    }  
    
    return this.http.get(this.baseUrl + animalId);

  }


  

  GetPaginatedAnimals(queryParams: AnimalQueryParams): Observable<PaginationResult<Animal[]>>
  {

    let queryKey = Object.values(queryParams).join('-');
    const cachedQuery = this.cachedQueries.get(queryKey);
    if(cachedQuery){
      
      let filteredAnimals = this.centralAnimalCache.filter(x=>cachedQuery.result.includes( x.id));

      var paginatedAnimals : PaginationResult<Animal[]> = {
      pagination : cachedQuery.pagination,
      result : filteredAnimals
      }

      return of(paginatedAnimals);
    }

    let params = this.paginationService.GetPaginationParams(queryParams.pageNumber,queryParams.itemsPerPage);

    if(queryParams.category){params = params.append('Category',queryParams.category)}
    if(queryParams.MaxPrice){params = params.append('MaxPrice',queryParams.MaxPrice.toString())}
    if(queryParams.MinPrice){params = params.append('MaxPrice',queryParams.MinPrice.toString())}
    if(queryParams.OrderBy){params = params.append('OrderBy',queryParams.OrderBy)}
    if(queryParams.SearchString){params = params.append('SearchString',queryParams.SearchString)}
    if(queryParams.OrderDirection === 'desc'){params = params.append('IsDescending',true.toString())}
   

    return this.paginationService.GetPaginatedResult<Animal[]>(this.baseUrl + "Paginated",params).pipe(tap(
      res=>{
      
      var idArray = res.result.map(function(x){return x.id});

      var paginatedIdArray:PaginationResult<number[]> = {
        result : idArray,
        pagination : res.pagination
      } 
      this.cachedQueries.set(queryKey,paginatedIdArray);

      
      let idsNotAlreadyStored = idArray.filter(x=>this.allIdsStored.includes(x) == false);

      this.allIdsStored = this.allIdsStored.concat(idsNotAlreadyStored);
      
      let animalsToAdd = res.result.filter(x=>idsNotAlreadyStored.includes(x.id));

      this.centralAnimalCache = this.centralAnimalCache.concat(animalsToAdd);
    }
    ));
  }

  AddPhotoToCache(id:number,photo:Image){
    let index = this.centralAnimalCache.findIndex(x=>x.id == id);

    this.centralAnimalCache[index].images.push(photo); 
  }

  UpdateItem(animal: Animal) {
    
    return this.http.put(this.baseUrl, animal).pipe(tap(
      ()=>{
        
        let index = this.centralAnimalCache.findIndex(x=>x.id == animal.id);
        this.centralAnimalCache[index] = animal; 
      }
    ));

  }

  DeleteItem(id:number){
    return this.http.delete(this.baseUrl+id).pipe(tap(
      ()=>{
      this.allIdsStored = this.allIdsStored.filter(x=>x != id);
      this.centralAnimalCache = this.centralAnimalCache.filter(x=>x.id != id);
      }
    ));
  }

  ArchiveItem(id:number){
    return this.http.delete(this.baseUrl+'Archive/'+id).pipe(tap(
      ()=>{
      this.allIdsStored = this.allIdsStored.filter(x=>x != id);
      this.centralAnimalCache = this.centralAnimalCache.filter(x=>x.id != id);
      }
    ));
  }

  CreateItem(data:AnimalCreationData){
    return this.http.post<Animal>(this.baseUrl+'NewAnimal',data).pipe(tap(
      newAnimal=>{
        console.log("from animalService.createItem: "+JSON.stringify(newAnimal))
        this.allIdsStored.push(newAnimal.id);
        this.centralAnimalCache.push(newAnimal);

        this.cachedQueries = new Map<string, PaginationResult<number[]>>();
      }
    ));
  }

  SetMainPhoto(setterOb: SetPhoto) {
    return this.http.put(`${environment.apiUrl}Photo/SetMainPhoto`, setterOb).pipe(tap(
      ()=>{
        let index = this.centralAnimalCache.findIndex(x=>x.id == setterOb.animalId);
        let animal = this.centralAnimalCache[index];
        let photo = animal.images.find(x=>x.id==setterOb.photoId);
        this.centralAnimalCache[index].mainPhoto = photo; 

      }
    ));
  }

  DeletePhotoFromCache(animalId:number,photoId:string){
    let animalIndex = this.centralAnimalCache.findIndex(x=>x.id == animalId);
    let animal = this.centralAnimalCache[animalIndex];
    let photoIndex = animal.images.findIndex(x => x.id == photoId);
    this.centralAnimalCache[animalIndex].images.splice(photoIndex, 1);        
  }
  
}
