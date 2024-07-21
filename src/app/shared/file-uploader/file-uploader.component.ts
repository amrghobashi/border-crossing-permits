import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploaderService } from 'src/app/shared/file-uploader/file-uploader.service';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})

export class FileUploaderComponent implements OnInit {
  @Input() requestNo!: number;
  @Input() addImgFlag!: boolean;
  private API_FILES = environment.API_FILES;
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = '';
  fileInfos?: Observable<any>;
  imgFormGroup = this._formBuilder.group({});
  imgForm = new FormData();
  uploadDone = false;
  images: any;
  fileSrc = '';
  isLoading = true;

  constructor(private uploaderService: FileUploaderService, private _formBuilder: FormBuilder, private sharedService: SharedService, private _snackBar: MatSnackBar,
    public dialog: MatDialog) {    
  }

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.uploaderService.getImages(this.requestNo).subscribe(data => {
      const localStorageData: any = localStorage.getItem('userData');
      const userData = JSON.parse(localStorageData);
      this.fileSrc = this.API_FILES + userData.id + '/' + this.requestNo;
      console.log(this.fileSrc);
      this.images = data;
      this.isLoading = false;
    })
  }

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      console.log(file.name)
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.imgForm = new FormData();
      this.imgForm.append('request_id', this.requestNo.toString());
      this.imgForm.append('request_image', file, file.name);
      this.progress = 0;
    } else {
      this.fileName = '';
    }
  }

  onSubmitFile(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.uploaderService.upload(this.imgForm).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            // this.message = "تم رفع الصورة بنجاح";
            this.uploadDone = true;
            this.fileName = '';
            this.getImages();
            this.openConfirmMsg("تم رفع الصورة بنجاح");
          }
        },
        (err: any) => {
          // console.log(err);
          this.currentFile = undefined;
          this.progress = 0;

          if (err.error && err.error.message) {
            this.uploadDone = false;
            this.message = "نوع الصورة يجب أن يكون (jpeg, png, jpg), وأن لا يزيد حجم الصورة عن 5MB";
          } else {
            // console.log("else")
            this.uploadDone = false;
            this.message = 'لم يتم رفع الصورة, يرجى المحاولة مرة أخرى';
          }

        });
    }

  }


  deleteImage(path: string) {
    let imgPath = {'path': path}
    this.uploaderService.deleteImage(imgPath).subscribe(() => {
      this.getImages();
      this.openConfirmMsg("تم حذف الصورة");
    })
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

  openImage(imgName: string) {
    // this.dialog.open(DialogComponent);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '95vw',
      height: '95vh',
      data: {
        msg: imgName,
        image: true,
        type: "upload"
      }
    });
  }
}