import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebPetShop';

 
  constructor(private http: HttpClient) {
        
  }

  ngOnInit(): void {
    
  }

  //syntax for basic http query from front end. but still missing 
  //something, pipe or something.  
  
  //GetUsers(){
  //   this.http.get('https://localhost:5001/api/users').subscribe(
  //     {
  //       next:(data)=>{this.users=data;},
  //       error:(err)=>{console.log(err)},
  //       complete:()=>{console.log('complete')}
  //   }
  //   )
  // }

}
