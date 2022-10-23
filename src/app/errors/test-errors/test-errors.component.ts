import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = environment.apiUrl + "ErrorEmitter/";
  

  constructor(private http : HttpClient ) { }

  ngOnInit(): void {
  }

  Get404Error(){
    this.http.get(this.baseUrl+'not-found')
  .subscribe({
    next:result=>{console.log(result)},
    error:error=>{console.log(error)}})
  }

  Get400Error(){
    this.http.get(this.baseUrl+'bad-request')
  .subscribe({
    next:result=>{console.log(result)},
    error:error=>{console.log(error)}})
  }

  Get500Error(){
    this.http.get(this.baseUrl+'server-error')
  .subscribe({
    next:result=>{console.log(result)},
    error:error=>{console.log(error)}})
  }

  Get401Error(){
    this.http.get(this.baseUrl+'auth')
  .subscribe({
    next:result=>{console.log(result)},
    error:error=>{console.log(error)}})
  }
  
  Get400ValidationError(){
    this.http.post('https://localhost:5001/api/account/registration',{})
  .subscribe({
    next:result=>{console.log(result)},
    error:error=>{console.log(error)}})
  }
}
