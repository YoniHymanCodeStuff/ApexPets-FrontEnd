import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/model_Interfaces/Animal';
import { User } from 'src/app/model_Interfaces/User';
import { SetPhoto } from 'src/app/model_Interfaces/SetPhoto';
import { AccountService } from 'src/app/Services/account.service';
import { AnimalService } from 'src/app/Services/Animal.service';
import { CategoryService } from 'src/app/Services/category.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { Image } from 'src/app/model_Interfaces/Image';
import { PhotoService } from 'src/app/Services/photo.service';


@Component({
  selector: 'app-edit-item-page',
  templateUrl: './edit-item-page.component.html',
  styleUrls: ['./edit-item-page.component.css']
})
export class EditItemPageComponent implements OnInit {


  @Input() currentAnimal: Animal;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;

  baseUrl = environment.apiUrl;
  user: User | null;
  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private photoService: PhotoService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(u => this.user = u);
  }



  ngOnInit(): void {
    this.GetAnimal();

  }

  GetAnimal(): void {
    const id = Number(this.route.snapshot.paramMap.get('item-id'));

    this.animalService.getAnimal(id)
      .subscribe({
        next: animal => {
          this.currentAnimal = animal;
          console.log(JSON.stringify(animal));
        },
        complete: () => {
          this.InitializeUploader();
        }
      });
  }

  InitializeUploader() {

    const options: FileUploaderOptions = {

      url: this.baseUrl + 'photo/animal-photo/' + this.currentAnimal?.id,
      parametersBeforeFiles: true,
      authToken: `Bearer ${this.user?.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    }
    this.uploader = new FileUploader(options);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response && this.currentAnimal) {
        const photo = JSON.parse(response);

        this.animalService.AddPhotoToCache(this.currentAnimal.id, photo);
        this.GetAnimal();

      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  SetAsMainImage(_animalId: number, _photo: Image) {
    if (this.currentAnimal)

      if (this.currentAnimal.mainPhoto?.id == _photo.id) {
        this.toastr.info("image was already main.");
      }
      else {

        this.animalService.SetMainPhoto({ animalId: _animalId, photoId: _photo.id } as SetPhoto).subscribe(
          {

            error: (err) => { console.log(err) },
            complete: () => {
              this.currentAnimal.mainPhoto = _photo;
              this.toastr.success("Image has been set as main.");
            }
          }
        );
      }
  }

  DeleteImage(photoId: string) {
    if (this.currentAnimal.mainPhoto?.id == photoId) {
      this.toastr.warning("Cannot delete main image. Please set other image as main first.")
    }
    else {
      this.photoService.DeletePhoto(photoId).subscribe({

        error: (err) => { console.log(err) },
        complete: () => {

          this.animalService.DeletePhotoFromCache(this.currentAnimal.id, photoId);
          this.GetAnimal();
          this.toastr.success("Image has been deleted.");
        }

      })
    }
  }


}
