import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model_Interfaces/Customer';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model_Interfaces/User';
import { AccountService } from 'src/app/Services/account.service';
import { max, take } from 'rxjs';
import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';
import { Admin } from 'src/app/model_Interfaces/Admin';

@Component({
  selector: 'app-avatar-editor',
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.css']
})
export class AvatarEditorComponent implements OnInit {

  uploader: FileUploader;


  baseUrl = environment.apiUrl;
  user: User | null;

  @Input() currentUser: Customer | Admin;

  constructor(private accountService: AccountService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(u => this.user = u);

  }

  ngOnInit(): void {
    this.InitializeUploader();
  }

  InitializeUploader() {

    const options: FileUploaderOptions = {

      url: this.baseUrl + 'photo/avatar',
      authToken: `Bearer ${this.user?.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    }
    this.uploader = new FileUploader(options);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };


    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.currentUser.avatar = photo;

      }
    }
  }


}
