import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { carouselAsset, carouselAssets } from './carouselAssets';

@Component({
  selector: 'app-carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ] 
})
export class CarouselBannerComponent implements OnInit {

  assets:carouselAsset[] = carouselAssets;

  ngOnInit(): void {
  }

}
