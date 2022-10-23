import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate
 {

  constructor(private accountService:AccountService, private toastr :ToastrService) { }

  canActivate():  Observable<boolean >  {
    
    return this.accountService.CurrentUser$.pipe
    (
      map(
        user=>{
        if (user?.isAdmin) return true; 
        this.toastr.error("Access Denied.");
        return false;
      })
    )
  }
}
