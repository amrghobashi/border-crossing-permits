import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SharedService } from '../shared/shared.service';
import { LoginService } from './login.service';
import { AuthResponseData } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _formBuilder: FormBuilder, private loginService: LoginService,
    public dialog: MatDialog) { }

  subscription: Subscription = new Subscription;
  authData!: AuthResponseData;
  loginFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  flag = false;
  invalidUser: boolean = false;
  hide = true;

  ngOnInit() {
    this.subscription = this.loginService.invalidUser.subscribe(value => {
      this.invalidUser = value;
    })
  }

  login(): void {
    if (this.loginFormGroup.valid) {
      let data = this.loginFormGroup.value;
      this.loginService.login(data).subscribe(value => {
        this.authData = value;
        if (this.authData.admin_flag === 3) {
          this.router.navigateByUrl('requests/pending-requests');
        }
        else if (this.authData.admin_flag === 1) {
          this.router.navigateByUrl('export-import/export');
        }
        else if (this.authData.admin_flag === 4) {
          this.router.navigateByUrl('inquiry');
        }
        else if (this.authData.admin_flag === 2) {
          this.router.navigateByUrl('msdc-inquiry');
        }
        else this.router.navigateByUrl('login');
      })
    }
  }

  loginTest() {
    this.flag = true;
    setTimeout(() => {
      this.flag = false;
    }, 1200)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}