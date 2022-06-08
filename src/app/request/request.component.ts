import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestDetailService } from './request-detail/request-detail.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  detailStatus: boolean = false;
  supscription: Subscription = new Subscription;
  
  constructor(private requestDetailService: RequestDetailService) {}

  ngOnInit() {
    this.getStatus();
  }
  

  getStatus() {
    this.supscription = this.requestDetailService.detailStatus.subscribe(data =>{
      console.log(data);
      this.detailStatus = data;
      return this.detailStatus;
    }
    );
  }
  
  
}
