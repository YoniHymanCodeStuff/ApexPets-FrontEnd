import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Customer } from 'src/app/model_Interfaces/Customer';
import { User } from 'src/app/model_Interfaces/User';
import { AccountService } from 'src/app/Services/account.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {


  @ViewChild('EditProfileComponent') editProfileComp: EditProfileComponent;

  user: User | null;
  EditMode: boolean = false;
  customer: Customer;

  constructor(private accountService: AccountService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(u => { this.user = u });
  }

  ngOnInit(): void {
    this.loadUserData();

  }

  toggleEditMode(val: boolean) {
    this.EditMode = val;
  }

  UpdateCustomerData(val: Customer) {
    this.customer = val;
    this.accountService.UpdateCustomer(val);

  }


  loadUserData() {
    if (this.user) {

      if (!this.user.isAdmin) {
        this.accountService.GetCustomer().subscribe(
          c => { this.customer = c }
        )

      }


    }


  }


}
