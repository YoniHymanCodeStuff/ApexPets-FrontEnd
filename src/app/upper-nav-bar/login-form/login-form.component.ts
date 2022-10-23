import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { ILoginDto } from 'src/app/model_Interfaces/ILoginDto';
import { User } from 'src/app/model_Interfaces/User';
import { AccountService } from 'src/app/Services/account.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username: any;
  password: any;
  currentUser$: Observable<User | null>;
  user:User|null;

  constructor(private accountService: AccountService,private toastr:ToastrService,
    private router:Router) {
    this.currentUser$ = this.accountService.CurrentUser$,
    this.currentUser$.subscribe(u => this.user = u);
  }


  ngOnInit(): void {
  }

  Login() {

    var dto: ILoginDto = { Username: this.username, Password: this.password };

    this.accountService.Login(dto).
      subscribe({
           error: err => {
          console.log("failed to log in", err);},
        complete:()=>{this.toastr.success("Welcome back, "+this.username) }
      }
      )
   
  }

  Logout() {

    this.accountService.Logout();

  }

}
