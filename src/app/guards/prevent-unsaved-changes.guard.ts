import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditProfileComponent } from '../Pages/profile-page/edit-profile/edit-profile.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<ProfilePageComponent> {
  
  canDeactivate(
    component: ProfilePageComponent):  boolean {

    if(component.editProfileComp?.EditProfileForm?.dirty)
    {
      return confirm("If you leave this page your changes will not be saved. Are you sure you want to continue? ")
    }
    
    return true;
  }
  
}
