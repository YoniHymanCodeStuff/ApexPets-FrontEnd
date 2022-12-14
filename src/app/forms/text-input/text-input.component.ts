import { Component, OnInit,Input, Self, Type } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor{

  @Input() label:string;
  @Input() type:string = "text";
  @Input() IsPassword:boolean = false;
  
  fieldTextType: any;
  

  constructor(@Self() public ngControl:NgControl ) {
    this.ngControl.valueAccessor = this;
   }
  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }

  ngOnInit(): void {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    if (this.type === "password" )
    {
      this.type = "text"
    }
    else
    {
      this.type = "password"
    }
  }

}
