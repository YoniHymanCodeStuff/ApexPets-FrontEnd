import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private baseUrl = environment.apiUrl + 'Photo/'

  constructor(private http: HttpClient) { }

  DeletePhoto(PhotoId: string) {
    return this.http.delete(this.baseUrl + 'deletePhoto/' + PhotoId);
  }
}
