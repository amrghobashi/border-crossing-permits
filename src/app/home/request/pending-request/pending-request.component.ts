import {Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { Request } from '../../../Models/request';
import { map, Observable, Subscription } from 'rxjs';
import { PendingRequestService } from './pending-request.service';
import { RequestService } from '../request.service';
import { PageEvent } from '@angular/material/paginator';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit, OnDestroy {

  requests: Request[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  subscription: Subscription = new Subscription;
  currentState!: number;
  detailStatus: boolean = false;
  detailId!: number;
  isLoading: boolean = true;

  requestsArray!: Request[];
  requestsArrayCopy!: Request[];
  paginationLength = 0;
  pageSize = 10;
  pageEvent: PageEvent = new PageEvent;
  chipID: number = 0;
  stepperOrientation: Observable<StepperOrientation>

  constructor(private _formBuilder: FormBuilder, private pendingRequestService: PendingRequestService,
    private requestService: RequestService, breakpointObserver: BreakpointObserver) {
    this.fetchreqSubscribe();
    this.stepperOrientation = breakpointObserver.observe('(min-width: 590px)').pipe(
      map(({matches}) => (matches ? 'horizontal' : 'vertical')
    ));
  }

  ngOnInit() {
    this.fetchRequest();
  }

  fetchRequest(): Observable<Request[]> {
    return this.pendingRequestService.getRequests();
  }

  fetchreqSubscribe() {
    this.subscription = this.fetchRequest().subscribe(data => {
      this.paginationLength = data.length;
      this.requestsArray = this.requestsArrayCopy = data;
      this.isLoading = false;
    })
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

  onKey(event: any) {
    let keyValue = event.target.value;
    this.searchRequest(keyValue);
  }

  searchRequest(id: number) {
    let strID = id.toString();
    if(this.chipID == 0) {
      this.requestsArray = this.requestsArrayCopy.filter(
        requests => requests.request_id.toString().startsWith(strID)
      );
    }
    else{
      this.requestsArray = this.requestsArrayCopy.filter(
        requests => requests.request_status_id === this.chipID && requests.request_id.toString().startsWith(strID)
      );
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
      this.requestsArray = this.requestsArrayCopy.filter(requests => requests.request_status_id === this.chipID)
    }
    this.paginationLength = this.requestsArray.length;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
