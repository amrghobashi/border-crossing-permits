import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RequestDetailService } from './request-detail.service';
import { Request } from '../../../Models/request';
import { RequestService } from './../request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit, OnDestroy {

  @Input() requestNo!: number;
  request!: Request;
  request_item!: Request;
  subscription: Subscription = new Subscription;
  @Input() isCompletedReq = false;
  @Input() inquiryFlag = false;
  
  constructor(private requestDetailService: RequestDetailService, private requestService: RequestService) { }
    
    ngOnInit(): void {
      this.fetchRequest();
    }
    
    fetchRequest() {
      this.requestDetailService.getRequests(this.requestNo).subscribe(data => {
        this.request = data;
      })
    }
  
    goBack() {
      this.requestService.isDetail.next(false)
    }
  
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}
