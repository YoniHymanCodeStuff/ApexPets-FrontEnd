import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PaginationResult } from '../model_Interfaces/Pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) { }


  public GetPaginationParams(pageNumber: number, pageSize: number) {
    var params = new HttpParams();
    params = params.append('pageNumber', pageNumber)
    params = params.append('pageSize', pageSize)
    return params;
  }

  public GetPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginationResult<T>> {

    const paginatedResult: PaginationResult<T> = new PaginationResult<T>();

    return this.http.get<T>(url, {
      observe: 'response',
      params
    }).pipe(
      map(
        (res: HttpResponse<T>) => {
          paginatedResult.result = res.body as T;
          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
          }
          return paginatedResult;
        }
      ));
  }
}
