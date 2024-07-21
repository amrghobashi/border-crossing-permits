import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { LoginService } from './login/login.service';
import { RequestService } from './home/request/request.service';
import { User } from './login/user';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'passComp';
  subscription: Subscription = new Subscription;
  userTypeFlag!: number;
  toolbarFlag = false;

  constructor(private loginService: LoginService, private requestService: RequestService) { 
    this.subscription = this.loginService.toolbarFlag.subscribe(data => {
      this.toolbarFlag = data;
    })
  }

  ngOnInit() {
    this.loginService.autoLogin();
    // this.subscription = this.loginService.toolbarFlag.subscribe(data => {
    //   this.toolbarFlag = data;
    // })
  }
}
