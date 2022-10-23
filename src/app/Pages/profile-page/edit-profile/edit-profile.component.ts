
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/model_Interfaces/Customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../profile-page.component.css','./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  @Input() customer?:Customer;
  @Output() customerChange = new EventEmitter<Customer>();
  @Output() editMode = new EventEmitter<boolean>();
  @ViewChild('EditProfileForm') EditProfileForm : NgForm;
   
  
  constructor() { }

  ngOnInit(): void {
    
  }

  SaveChanges()
  {

    this.customerChange.emit(this.customer);
    this.toggleToView();
    
  }

  toggleToView()
  {
    this.editMode.emit(false);
  }
  

}
