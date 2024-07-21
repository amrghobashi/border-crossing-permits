import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnDestroy {
  detailStatus: boolean = false;
  detailId!: number;
  adminFlag!: number;
  reqCount:any;
  subscription: Subscription = new Subscription;
  tabLinks = [
    {'path': 'pending-requests', 'label': 'pending', 'count': ''},
    {'path': 'completed-requests', 'label': 'finished', 'count': ''},
    {'path': 'new-request', 'label': 'new request', 'count': ''}
];
  activelink = this.router.url.replace("/requests/", "");
    
    constructor(private requestService: RequestService, private loginService: LoginService, private router: Router) {}
    
  ngOnInit() {
    this.getAdminFlag();
    this.getStatus();
    this.getCount();
    this.redirectFromNewRequest();
  }
  
  private getAdminFlag() {
    this.subscription = this.loginService.userTypeFlag.subscribe(data => {
      this.adminFlag = data;
    });
  }

  getStatus() {
    this.subscription = this.requestService.detailId.subscribe(data =>{
      this.detailId = data;
      return this.detailId;
    }
    );
  }

  reset() {
    this.requestService.detailStatus.next(false);
  }

  getCount() {
    this.requestService.getCount().subscribe(value => {
      this.reqCount = value;
      this.tabLinks[0]['count'] = this.reqCount['pending'];
      this.tabLinks[1]['count'] = this.reqCount['completed'];
    })
  }

  redirectFromNewRequest() {
    this.subscription = this.requestService.redirectFromNew.subscribe(data => {
      if(data) {
        this.requestService.getCount().subscribe(value => {
          this.reqCount = value;
          this.tabLinks[0]['count'] = this.reqCount['pending'];
          this.tabLinks[1]['count'] = this.reqCount['completed'];
          this.activelink = this.router.url.replace("/requests/new-request", "pending-requests");
      });
      }
    })
    this.requestService.redirectFromNew.next(false);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
