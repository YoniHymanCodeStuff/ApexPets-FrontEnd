import { Injectable } from '@angular/core';
import { Observable, ReplaySubject,tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.apiUrl;

  private categoriesSource$ = new ReplaySubject<string[] | null>(1);
  categories$ = this.categoriesSource$.asObservable();

  constructor(private http: HttpClient) { }

  getCategories() : Observable<any>
  {
    
    return this.http.get<string[]>(this.baseUrl + 'animals/categories').pipe(tap(
      retval=>{
      this.categoriesSource$.next(retval)}
    ));
   
  }

  
}
