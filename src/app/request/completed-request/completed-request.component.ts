import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompletedRequestService } from './completed-request.service';
import { Request } from '../../Models/request';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed-request',
  templateUrl: './completed-request.component.html',
  styleUrls: ['./completed-request.component.css']
})
export class CompletedRequestComponent implements OnInit, OnDestroy {
  requests: Request[] = [];

  supscription: Subscription = new Subscription;
  constructor(private completedRequestService: CompletedRequestService) { }

  ngOnInit(): void {
    this.supscription = this.completedRequestService.getRequests().subscribe((requests) => {
      // console.log(requests);
      this.requests = JSON.parse(JSON.stringify(requests));
      // this.requests = requests;
    })
  }

  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }
}
