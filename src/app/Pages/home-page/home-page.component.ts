import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { cardAsset, cardAssets } from './cardsAssets';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories : cardAsset[] = cardAssets;

  constructor() { }

  ngOnInit(): void {
  }
 

}
