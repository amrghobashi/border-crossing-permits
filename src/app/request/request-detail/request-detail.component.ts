import { Component, OnDestroy, OnInit } from '@angular/core';
import { PendingRequestService } from '../pending-request/pending-request.service';
import { RequestDetailService } from './request-detail.service';
import { Request } from '../../Models/request';
import { RequestService } from './../request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit, OnDestroy {

  requestNumber!: number;
  request!: Request;
  supscription: Subscription = new Subscription;

  constructor(private requestDetailService: RequestDetailService, private requestService: RequestService, private pendingRequestService: PendingRequestService,) { }

  ngOnInit(): void {
    this.getRequestDetail();
    this.fetchRequest();
  }

  getRequestDetail() {
    this.requestService.detailId.subscribe(data=> {
      this.requestNumber = data;
    })
  }

  fetchRequest() {
    this.supscription = this.requestDetailService.getRequests(this.requestNumber).subscribe((request) => {
      this.request = JSON.parse(JSON.stringify(request));
      // console.log(this.request.request_number);
    })
  }

  goBack() {
    this.requestService.detailStatus.next(false);
  }

  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }
}
