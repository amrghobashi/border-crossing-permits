import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { ExcelUploaderService } from './excel-uploader.service';

@Component({
  selector: 'app-excel-uploader',
  templateUrl: './excel-uploader.component.html',
  styleUrls: ['./excel-uploader.component.css']
})
export class ExcelUploaderComponent implements OnInit {
  @Input() uploadType!: string;
  confirmMsg: string = '';
  url: string = '';

  currentFile?: File;
  progress = 0;
  message = '';
  fileName = '';
  fileInfos?: Observable<any>;
  excelFormGroup = this._formBuilder.group({});
  excelForm = new FormData();
  uploadDone = false;
  images: any;
  fileSrc = '';


  constructor(private excelUploaderService: ExcelUploaderService, private _formBuilder: FormBuilder, private sharedService: SharedService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.uploadType === 'requests') {
      this.confirmMsg = ' طلب ';
      this.url = 'import_requests';
    }
    else if(this.uploadType === 'items'){
      this.confirmMsg = ' صنف ';
      this.url = 'import_items';
    }
    else {
      this.confirmMsg = ' مستخدم ';
      this.url = 'import_users';
    }
  }
  onSelectFile(event: any): void {
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.excelForm = new FormData();
      this.message = '';
      // this.imgForm.append('request_id', this.requestNo.toString());
      this.excelForm.append('file', file, file.name);
      this.progress = 0;
    } else {
      this.fileName = '';
    }
  }

  onSubmitFile(): void {
    this.progress = 0;
    this.message = "";
    if (this.currentFile) {
      this.excelUploaderService.upload(this.excelForm, this.url).subscribe(
        (event: any) => {
          // if (event.type === HttpEventType.UploadProgress) {
          //   this.progress = Math.round(100 * event.loaded / event.total);
          // }
           if (event instanceof HttpResponse) {
            // console.log(event.body.message);
            if(event.body.message == "NOTEXCEL") {
              this.currentFile = undefined;
              this.progress = 0;
              this.uploadDone = false;
              this.message = "نوع الملف يجب أن يكون (xlsx)";
            }
            else if(event.body.message == "ERROR"){
              this.currentFile = undefined;
              this.progress = 0;
              this.uploadDone = false;
              this.message = 'لم يتم رفع الملف, يرجى المحاولة مرة أخرى';
            }
            else{
              this.uploadDone = true;
              this.fileName = '';
              this.openConfirmMsg("تم رفع عدد "+event.body['count'] + this.confirmMsg + " بنجاح");
            }
          }
          if (event.type === HttpEventType.UploadProgress && !event.body) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
        },
        (err: any) => {
          // console.log(err);
          this.currentFile = undefined;
          this.progress = 0;

          if(err.error && err.error.message == "Undefined index: request_id") {
            this.uploadDone = false;
            this.message = "تأكد من رفع الملف الصحيح";
          } else {
            // console.log("else")
            this.uploadDone = false;
            this.message = 'لم يتم رفع الملف, يرجى المحاولة مرة أخرى';
          }

        });
    }
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

}
