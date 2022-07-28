import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompletedRequestService } from './completed-request.service';
import { Request } from '../../Models/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-completed-request',
  templateUrl: './completed-request.component.html',
  styleUrls: ['./completed-request.component.css']
})
export class CompletedRequestComponent implements OnInit, OnDestroy {
  requests: Request[] = [];

  supscription: Subscription = new Subscription;
  constructor(private completedRequestService: CompletedRequestService, private requestService: RequestService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests() {
    this.supscription = this.completedRequestService.getRequests().subscribe((requests) => {
      this.requests = JSON.parse(JSON.stringify(requests));
    })
  }
  
  seeDetails(reqId:number) {
    this.requestService.detailId.next(reqId);
    this.requestService.detailStatus.next(true);
    // console.log(reqId);
  }

  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }
}
