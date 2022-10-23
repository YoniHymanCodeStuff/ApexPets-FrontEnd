import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRegisterDto } from 'src/app/model_Interfaces/IRegisterDto';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-admin-creation-form',
  templateUrl: './admin-creation-form.component.html',
  styleUrls: ['./admin-creation-form.component.css']
})
export class AdminCreationFormComponent implements OnInit {

  AddAdminForm : FormGroup; 
  validationErrors: any;
  
  constructor(private accountService:AccountService,
    private fb : FormBuilder,private toastr:ToastrService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.AddAdminForm = this.fb.group({
     username:["",Validators.required],
     password:["", [Validators.required,Validators.maxLength(16), Validators.minLength(3)]],
     confirmPassword:["",[Validators.required, this.matchValues('password')]]
    })
    this.AddAdminForm.get('password')?.valueChanges.subscribe(()=>{
      this.AddAdminForm.get('confirmPassword')?.updateValueAndValidity();
    })
  }

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      const controlToMatchValue = (control?.parent as FormGroup)?.controls[matchTo]?.value;
      return control.value === controlToMatchValue ? null : {isMatching:true};

    }
  }

  TryRegister(){
   
    var dto :IRegisterDto = {Username :this.AddAdminForm.value.username, Password:this.AddAdminForm.value.password, Email:'you@Apexpets.com' };

    this.accountService.CreateAdmin(dto).subscribe({
      error:(err)=>{console.log(err);this.validationErrors = err},
      complete:()=>{
        this.toastr.info("New Admin account has been successfully created. Make sure to save the username and password before leaving this page.");
          }
    })

  }

}
