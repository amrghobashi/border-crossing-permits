import { Component, OnInit } from '@angular/core';
import { RequestDetailService } from './request-detail.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  requestNumber!: number;
  constructor(private requestDetailService: RequestDetailService) { }

  ngOnInit(): void {
  }

  getRequestDetail() {
    this.requestDetailService.detailId.subscribe(data=> {
      this.requestNumber = data;
      console.log(data)
    })
  }

  goBack() {
    this.requestDetailService.detailStatus.next(false);
  }
}
