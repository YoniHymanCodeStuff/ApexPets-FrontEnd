import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ILoginDto } from '../model_Interfaces/ILoginDto';
import { IRegisterDto } from '../model_Interfaces/IRegisterDto';
import { observeNotification } from 'rxjs/internal/Notification';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { User } from '../model_Interfaces/User';
import { environment } from 'src/environments/environment';
import { Customer } from '../model_Interfaces/Customer';
import { Admin } from '../model_Interfaces/Admin';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AccountService {


  currentCustomer: Customer;
  currentAdmin: Admin;


  baseUrl = environment.apiUrl + "account/";
  private currentUserSource$ = new ReplaySubject<User | null>(1);
  CurrentUser$ = this.currentUserSource$.asObservable();



  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  Login(model: ILoginDto) {
    return this.http.post<User>(this.baseUrl + 'login', model)
      .pipe(map((response: User) => {
        const user = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource$.next(user);
        }
      }
      ));
  }

  Logout() {

    let name="";
    name=this.currentAdmin?.userName;
    name=this.currentCustomer?.userName;
    if(name==undefined){name=""}
    if (name !== "") { name = " " + name }

    console.log(this.CurrentUser$.subscribe(x=>x?.userName))

    localStorage.removeItem('user');
    this.currentUserSource$.next(null);
    this.currentCustomer = {} as Customer;
    this.currentAdmin = {} as Admin;


    this.router.navigate(['/home'])
    this.toastr.success(`Goodbye${name}, come again soon!`);
  }

  SetCurrentUser(user: User) {
    this.currentUserSource$.next(user);
  }

  Register(registerDto: IRegisterDto) {
    return this.http.post(this.baseUrl + 'Registration', registerDto);
  }

  CreateAdmin(registerDto: IRegisterDto) {
    return this.http.post(this.baseUrl + 'CreateAdmin', registerDto);
  }

  GetCustomer() {
    if (this.currentCustomer?.id) {
     
      return of(this.currentCustomer);
    }
    

    return this.http.get<Customer>(`${this.baseUrl}Customer`)
      .pipe(tap(c => this.currentCustomer = c));
  }

  GetAdmin() {
    if (this.currentAdmin?.id) {
      return of(this.currentAdmin);
    }
    return this.http.get<Admin>(`${this.baseUrl}Admin`).
      pipe(tap(a => this.currentAdmin = a));

  }

  UpdateCustomer(customer: Customer) {

    this.currentCustomer = customer;
    return this.http.put(`${this.baseUrl}UpdateCustomer`, customer).subscribe
      (
        {
          error: (err) => { console.log(err) },
          complete: () => { this.toastr.success("changes saved") }
        }
      );
  }

  UpdateAdmin(admin: Admin) {
    return this.http.patch(`${this.baseUrl}Admin`, admin).pipe(tap(
      () => { this.currentAdmin = admin }
    ));
  }

}


