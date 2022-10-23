import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  userInput: string = '';
  validationErrors: any;
  AddFeedbackForm: FormGroup;

  constructor(private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  SendMessage() {
    this.userInput = "";
    this.toastr.success("Your message has been sent. Thank you for your feedback!")
    // this is currently a feedback system that does nothing. essentially this would send an
    // automated e-mail to the company.  
  }

  initializeForm() {
    this.AddFeedbackForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

}
