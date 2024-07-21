import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login/login.service';
import { Subscription } from 'rxjs';

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

  constructor(private loginService: LoginService) { 
    this.subscription = this.loginService.toolbarFlag.subscribe(data => {
      this.toolbarFlag = data;
    })
  }

  ngOnInit() {
    this.loginService.autoLogin();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
