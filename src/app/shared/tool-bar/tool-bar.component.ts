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

  constructor(private loginService: LoginService, private companyService: CompanyService,
    public dialog: MatDialog, private sharedService: SharedService, private _snackBar: MatSnackBar) {
    this.subscription = this.loginService.userTypeFlag.subscribe(data => {
      this.adminFlag = data;
    })
    this.getCompanyName();
  }

  ngOnInit(): void { }

  selectedClass(value: string) {
    this.selected = value;
  }

  getCompanyName() {
    const data: any = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    this.subscription = this.companyService.getCompanyName(userData.id).subscribe(data => {
      this.companyName = data['company_name'];
    });
  }

  openPassModal() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        msg: this.companyName,
        image: false,
        type: "pwd"
      }
    });
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
