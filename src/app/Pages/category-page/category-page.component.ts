import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Animal } from 'src/app/model_Interfaces/Animal';
import { CategoryService } from 'src/app/Services/category.service';
import { AnimalService } from 'src/app/Services/Animal.service';
import { Pagination } from 'src/app/model_Interfaces/Pagination';
import { filter } from 'rxjs';
import { AnimalQueryParams } from 'src/app/model_Interfaces/AnimalQueryParams';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  demoImg: string = "https://res.cloudinary.com/storage-for-demo-apps/image/upload/v1659357956/output-onlinepngtools_1_f9y8qp.png";
  items: Animal[];
  itemRoute: string = "";
  pagination: Pagination;
  queryParams: AnimalQueryParams = new AnimalQueryParams();


  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private animalService: AnimalService,
    private router: Router,
    private accountService: AccountService) {
    this.queryParams.itemsPerPage = 6;
    this.queryParams.pageNumber = 1;
    this.accountService.CurrentUser$.subscribe(u => { if (u?.isAdmin) this.itemRoute = "edit/" });

  }

  ngOnInit(): void {
    this.ChangeCategory();
    //to refresh the component when category is changed:
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ChangeCategory();
      });
  }

  ChangeCategory() {

    this.route.url.subscribe(url => {
      this.GetCategory();
      this.GetAnimals();
    });
  }

  GetCategory() {
    this.queryParams.category = String(this.route.snapshot.paramMap.get('category-id'));
  }

  GetAnimals() {
    if (this.queryParams.category) {

      this.animalService.GetPaginatedAnimals(this.queryParams)
        .subscribe({
          next:
            res => {

              this.pagination = res.pagination;
              this.items = res.result;
            },
        });

    }
  }

  pageChanged({ page }: any) {
    this.queryParams.pageNumber = page;
    this.GetAnimals();
  }

}
