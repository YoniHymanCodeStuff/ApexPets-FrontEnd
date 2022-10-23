import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRegisterDto } from 'src/app/model_Interfaces/IRegisterDto';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registerForm: FormGroup;
  validationErrors: any;

  constructor(private accountService: AccountService,
    private fb: FormBuilder, private toastr: ToastrService,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(3)]],
      confirmPassword: ["", [Validators.required, this.matchValues('password')]],
      email: ["", [Validators.required, Validators.email]]
    })
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlToMatchValue = (control?.parent as FormGroup)?.controls[matchTo]?.value;
      return control.value === controlToMatchValue ? null : { isMatching: true };

    }
  }


  TryRegister() {
    var dto: IRegisterDto = { Username: this.registerForm.value.username, Password: this.registerForm.value.password, Email: this.registerForm.value.email };

    this.accountService.Register(dto).subscribe({
      error: (err) => { console.log(err); this.validationErrors = err },
      complete: () => {
        this.toastr.success("Your account has been successfully created. Here you can view and update your profile data.");
        this.accountService.Login({ Username: dto.Username, Password: dto.Password }).subscribe({
          error: (err) => { console.log(err) },
          complete: () => { this.router.navigate(['profile'], { relativeTo: this.route.parent }) }
        });



      }
    })

  }

}
