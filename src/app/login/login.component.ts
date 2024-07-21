import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SharedService } from '../shared/shared.service';
import { LoginService } from './login.service';
import { AuthResponseData, User } from './user';
// import {MatDialog} from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

  constructor(private router: Router, private _formBuilder: FormBuilder, private loginService: LoginService, private sharedService: SharedService,
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

  login() : void {
    if(this.loginFormGroup.valid){
      let data = this.loginFormGroup.value;
      // console.log(data);
      this.loginService.login(data).subscribe(value => {
        this.authData = value;
        // this.flag = true;
        // setTimeout(() => {
          if(this.authData.admin_flag === 3) {
            this.router.navigateByUrl('requests/pending-requests');
          }
          else if(this.authData.admin_flag === 1) {
            this.router.navigateByUrl('export-import/export');
          }
          else if(this.authData.admin_flag === 4) {
            this.router.navigateByUrl('inquiry');
          }
          else if(this.authData.admin_flag === 2) {
            this.router.navigateByUrl('msdc-inquiry');
          }
          // this.flag = false;
        // }, 3000)
        // }
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

  openPdf() {
    // window.open("./../../assets/new_user.pdf", "_blank")

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      height: '800px',
      data: {
        msg: './../../assets/newUser.JPG',
        image: true,
        type: "upload"
      }
    });
  }
  }