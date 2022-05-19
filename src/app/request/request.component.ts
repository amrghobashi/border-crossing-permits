import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestService } from './request.service';
import { Request } from '../Models/request';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnDestroy {

  requests: Request[] = [];
  newReq: Request = 
    {
      "id": 4,
      "request_number": 1000,
      "request_date": "2021/11/14",
      "subject": "نقل خامات تحويل السيارات للعمل بالغاز الطبيعى وعدد يدوية وأثاث مكتبى وجهاز كمبيوتر كامل بالاستاند الحديد",
      "address": " محطة الغاز الطبيعى للسيارات التابعة لشركة ( كار جاس ) والكائنة بشارع اسيوط بجوار قسم ثالث العريش",
      "pass_id": "معدية شرق التفريعة غرب",
      "notes": "65",
      "request_status": "تحت التنفيذ",
      "tasdek_status": "24",
      "tasdek_detail": "تحت التنفيذ"
  };
  test: any;
  supscription: Subscription = new Subscription;
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.supscription = this.requestService.getRequests().subscribe((requests) => {
      console.log(requests);
      this.requests = JSON.parse(JSON.stringify(requests));
      this.dataSource = this.requests;
    })
  }

  displayedColumns: string[] = ['request_number', 'request_date', 'subject', 'address', 'pass_id', 'notes', 'request_status', 'tasdek_status', 'tasdek_detail'];
  dataSource: Request[] = [];

  addRequest() {
    this.requestService.addRequest(this.newReq).subscribe(req => {
      console.log(req);
    })
  }

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }
}
