import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { ConfirmMessageComponent } from '../confirm-message/confirm-message.component';
import { SharedService } from '../shared.service';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder, private loginService: LoginService, private sharedService: SharedService,
    private _snackBar: MatSnackBar) { }

  subscription: Subscription = new Subscription;
  passwordFormGroup = this._formBuilder.group({
    oldPassword: ['', [Validators.required,]],
    newPassword: ['', [Validators.required]],
    confirmNewPassword: ['', [Validators.required]],
  });
  hide1 = true;
  hide2 = true;
  hide3 = true;
  notIdentical = false;
  invalidUser: boolean = false;

  ngOnInit(): void {
    this.subscription = this.loginService.invalidUser.subscribe(value => {
      this.invalidUser = value;
    })
  }

  confirmDelete() {
    return 1;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get oldPasswordInput() { return this.passwordFormGroup.get('oldPassword'); }
  get newPasswordInput1() { return this.passwordFormGroup.get('newPassword'); }
  get newPasswordInput2() { return this.passwordFormGroup.get('confirmNewPassword'); }

  submitNewPassword() {
    this.notIdentical = false;
    if (this.passwordFormGroup.valid) {
      if (this.newPasswordInput1?.value == this.newPasswordInput2?.value) {
        this.loginService.changePassword({
          'oldPassword': this.oldPasswordInput?.value,
          'newPassword': this.newPasswordInput1?.value,
          'confirmNewPassword': this.newPasswordInput2?.value
        }).subscribe(() => {
          this.dialogRef.close();
          this.openConfirmMsg("password has been changed successfully");
        })
      }
      else {
        this.notIdentical = true;
        setTimeout(() => {
          this.notIdentical = false;
        }, 2500)
      }
    }
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}