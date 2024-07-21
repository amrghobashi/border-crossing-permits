import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from './notification.service';
import { Notification } from '../../Models/notification';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private notificationService: NotificationService, private sharedService: SharedService, private _snackBar: MatSnackBar) { }
  notif: any;
  subscription: Subscription = new Subscription;
  firstFormGroup = this._formBuilder.group({notification: ['', [Validators.maxLength(1000)]]});
  isLoading = true;

  ngOnInit(): void {
    this.getNotif();
  }

  getNotif() {
    this.subscription = this.notificationService.getNotification().subscribe(data =>{
      this.notif = data;
      this.firstFormGroup = this._formBuilder.group({
        notification: [this.notif.notification_name, [Validators.maxLength(1000)]],
      });
      this.isLoading = false;
    })
  }

  updateNotif() {
    this.notif = this.firstFormGroup.value;
    this.subscription = this.notificationService.updateNotification(this.notif).subscribe(value => {
      this.openConfirmMsg("تم التعديل بنجاح");
    })
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

}
