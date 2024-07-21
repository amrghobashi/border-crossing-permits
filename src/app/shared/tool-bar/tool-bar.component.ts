import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/home/company/company.service';
import { NotificationService } from 'src/app/home/notification/notification.service';
import { LoginService } from 'src/app/login/login.service';
import { ConfirmMessageComponent } from '../confirm-message/confirm-message.component';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  subscription: Subscription = new Subscription;
  adminFlag!: number;
  notification!: any;
  notifName: string = '';
  selected = '';
  companyName: string = '';

  constructor(private loginService: LoginService, private notificationService: NotificationService, private companyService: CompanyService,
    public dialog: MatDialog, private sharedService: SharedService, private _snackBar: MatSnackBar) {
    this.subscription = this.loginService.userTypeFlag.subscribe(data => {
      this.adminFlag = data;
    })
    this.getCompanyName();
  }

  ngOnInit(): void {
    // this.subscription = this.notificationService.getNotification().subscribe(value => {
    //   this.notification = value;
    //   this.notifName = this.notification.notification_name;
    //   // this.adminFlag = this.loginService.userTypeFlag
    // console.log(this.adminFlag)
    // })
  }

  selectedClass(value: string) {
    this.selected = value;
  }

  getCompanyName() {
    const data: any = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    // let comp_id = this.loginService.user.subscribe(data=> {
    //   console.log(data)
    // })
    this.subscription = this.companyService.getCompanyName(userData.id).subscribe(data => {
      this.companyName = data['company_name'];
    });
  }

  openPassModal() {
    // this.dialog.open(DialogComponent);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        msg: this.companyName,
        image: false,
        type: "pwd"
      }
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.openConfirmMsg("تم تغيير كلمة المرور بنجاح ");
    // })
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

  logout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
