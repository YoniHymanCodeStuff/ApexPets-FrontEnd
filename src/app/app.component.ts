import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebPetShop';

 
  constructor(private accountService:AccountService) {
        
  }

  ngOnInit(): void {
    
    this.SetCurrentUser();
  }

  SetCurrentUser(){
    const userFromLS : any = localStorage.getItem('user');
    const user = JSON.parse(userFromLS);
    this.accountService.SetCurrentUser(user);
  }

}
