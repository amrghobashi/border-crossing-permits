import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CompletedRequestService } from './completed-request.service';
import { Request } from '../../../Models/request';
import { Observable, Subscription } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-completed-request',
  templateUrl: './completed-request.component.html',
  styleUrls: ['./completed-request.component.css']
})
export class CompletedRequestComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription;
  requestsArray!: Request[];
  requestsArrayCopy!: Request[];
  paginationLength = 0;
  pageSize = 10;
  pageEvent: PageEvent = new PageEvent;
  isLoading: boolean = true;
  detailId!: number;
  chipID: number = 0;
  detailStatus: boolean = false;

  constructor(private completedRequestService: CompletedRequestService, private requestService: RequestService) {
    this.fetchreqSubscribe();
  }

  ngOnInit(): void {
  }

  fetchRequests(): Observable<Request[]> {
    return this.completedRequestService.getRequests();
  }

  fetchreqSubscribe() {
    this.subscription = this.fetchRequests().subscribe(data => {
      this.paginationLength = data.length;
      this.requestsArray = this.requestsArrayCopy = data;
      this.isLoading = false;
    })
  }
  
  onKey(event: any) {
    let keyValue = event.target.value;
    this.searchRequest(keyValue);
  }

  searchRequest(id: number) {
    let strID = id.toString();
    if(this.chipID == 0) {
      this.requestsArray = this.requestsArrayCopy.filter(requests => requests.request_id.toString().startsWith(strID));
    }
    else{
      this.requestsArray = this.requestsArrayCopy.filter(requests => requests.response_id === this.chipID && requests.request_id.toString().startsWith(strID));
    }
    this.paginationLength = this.requestsArray.length;
  }
  
  seeDetails(reqId:number) {
    this.detailId = reqId;
    this.requestService.isDetail.next(true);
    this.getStatus();
  }

  getStatus() {
    this.subscription = this.requestService.isDetail.subscribe(data => {
      this.detailStatus = data;
    })
  }

  chipClick(value: number) {
    this.chipID = value;
    if(this.chipID == 0)
    {
      this.requestsArray = this.requestsArrayCopy;
    }
    else{
      this.requestsArray = this.requestsArrayCopy.filter(requests => requests.response_id === this.chipID)
    }
    this.paginationLength = this.requestsArray.length;
  }

  toggleClick(value: number) {
    this.chipID = value;
    if(this.chipID == 0)
    {
      this.requestsArray = this.requestsArrayCopy;
    }
    else{
      this.requestsArray = this.requestsArrayCopy.filter(requests => requests.response_id === this.chipID)
    }
    this.paginationLength = this.requestsArray.length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
