import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from '../Pages/registration-page/registration-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { LoginFormComponent } from '../upper-nav-bar/login-form/login-form.component';
import { EditProfileComponent } from '../Pages/profile-page/edit-profile/edit-profile.component';
import { ViewProfileComponent } from '../Pages/profile-page/view-profile/view-profile.component';
import { AvatarEditorComponent } from '../Pages/profile-page/edit-profile/avatar-editor/avatar-editor.component';
import { AdminCreationFormComponent } from '../Pages/admin-creation-form/admin-creation-form.component';
import { AdminProfileComponent } from '../Pages/admin-profile/admin-profile.component';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    RegistrationPageComponent,
    ProfilePageComponent,
    EditProfileComponent,
    ViewProfileComponent,
    AvatarEditorComponent,
    AdminCreationFormComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    RegistrationPageComponent,
    ProfilePageComponent,
    
    EditProfileComponent,
    ViewProfileComponent,
    AvatarEditorComponent,
    AdminCreationFormComponent,
    AdminProfileComponent
  ]
})
export class AccountModule { }
