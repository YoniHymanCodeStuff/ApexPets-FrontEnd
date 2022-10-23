import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  activeRequestCounter = 0;

  constructor(private spinner:NgxSpinnerService) { }

  busy()
  {
    this.activeRequestCounter++;
    this.spinner.show(undefined,{type:'ball-scale-ripple-multiple'});

  }

  idle()
  {
    this.activeRequestCounter--;
    if(this.activeRequestCounter<1)
    {
      this.spinner.hide();
    }
  }
}
