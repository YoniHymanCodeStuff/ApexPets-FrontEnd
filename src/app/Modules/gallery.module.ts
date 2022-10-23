import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselBannerComponent } from '../Pages/home-page/carousel-banner/carousel-banner.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [CarouselBannerComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports:[CarouselModule,
  CarouselBannerComponent]
})
export class GalleryModule { }
