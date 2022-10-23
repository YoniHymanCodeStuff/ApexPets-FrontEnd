import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router:Router,//to be able to redirect when errors happen
    private toastr:ToastrService,

  ) {}

  //this function should be dried up 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError(err=>{
        switch(err.status){
          case 400:
            if(err.error?.errors){//checking for validation error which has inner errors. 
              const modelStateErrors = [];
              for (const key in err.error.errors) {//loops over the internal errors
                if(err.error.errors[key]){
                  modelStateErrors.push(err.error.errors[key]);//pushing it into our return var
                }
              }
              throw modelStateErrors.flat();//returns all levels of errors as a one dimensional array. 
            }
            else{
              this.toastr.error((err.statusText === 'OK' ? 'Bad Request: ': err.statusText)+err.error,err.status )
            }
            break;
          
          case 401:
            this.toastr.error(err.statusText === 'OK' ? 'Unauthorized': err.statusText,err.status )
            break;
          case 500://this is info that is saved only during navigation. after refresh will dissappear.  
            const navigationExtras: NavigationExtras = {state:{error:err.error}} 
            this.router.navigateByUrl('/server-error',navigationExtras);
            break;
          case 404:
            this.router.navigateByUrl('/not-found');
            break;
          default:
              this.toastr.error('something unexpected went wrong');
              console.log("the error:"+ err);
            break;

        }
        throw throwError(()=>err);
      })
    );
  }
}
