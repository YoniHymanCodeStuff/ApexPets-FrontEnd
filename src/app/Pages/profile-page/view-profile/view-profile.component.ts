import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/model_Interfaces/Customer';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['../profile-page.component.css','./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @Input() customer?:Customer;
  @Output() editMode = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    
  }

  toggleToEdit()
  {
    this.editMode.emit(true);
    
  }

  showjson()
  {
    if(this.customer)
    {
      var jace = JSON.stringify(this.customer);

      console.log(jace);
    }
  }

}
