import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { User } from '../model_Interfaces/User';
import { AccountService } from '../Services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private account: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser:User|null = {token:'',userName:'',isAdmin:false};

    this.account.CurrentUser$.pipe(take(1)).subscribe(user=>{if (user)currentUser = user});
    if(currentUser.token){
      request = request.clone({ //we clone bc requests are immutable
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request);
  }
}
