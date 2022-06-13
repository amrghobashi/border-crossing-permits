import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PendingRequestService } from './pending-request/pending-request.service';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  detailStatus: boolean = false;
  supscription: Subscription = new Subscription;
  
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.getStatus();
  }
  

  getStatus() {
    this.supscription = this.requestService.detailStatus.subscribe(data =>{
      // console.log(data);
      this.detailStatus = data;
      return this.detailStatus;
    }
    );
  }

  reset() {
    this.requestService.detailStatus.next(false);
    console.log("reset")
  }
  
  
}
