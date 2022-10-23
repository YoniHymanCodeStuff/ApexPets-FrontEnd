import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/model_Interfaces/Admin';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  admin:Admin;
  
  constructor(private accountService:AccountService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.LoadAdmin();
  }

  LoadAdmin(){
    this.accountService.GetAdmin().subscribe(x=>this.admin = x);
  }

  UpdateAdmin(){
    this.accountService.UpdateAdmin(this.admin).subscribe({
      complete:()=>{this.toastr.success("updated profile")}
    })
  }


}
