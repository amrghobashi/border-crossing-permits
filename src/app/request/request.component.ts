import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestDetailService } from './request-detail/request-detail.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  
  constructor(private requestDetailService: RequestDetailService) {}

  ngOnInit() {}
  detailStatus: boolean = false;
  supscription: Subscription = new Subscription;

  // this.supscription = this.requestDetailService.detailStatus.subscribe(data =>{
  //   console.log(data);
  // }
  // );
  
}
