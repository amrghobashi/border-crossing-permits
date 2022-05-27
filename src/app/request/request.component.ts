import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RequestService } from './request.service';
import { Request } from '../Models/request';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnDestroy, AfterViewInit {

  requests: Request[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  newReq: Request = 
    {
      "id": 8,
      "request_number": 1008,
      "request_date": "yehya",
      "subject": "نقل خامات تحويل السيارات للعمل بالغاز الطبيعى وعدد يدوية وأثاث مكتبى وجهاز كمبيوتر كامل بالاستاند الحديد",
      "address": " محطة الغاز الطبيعى للسيارات التابعة لشركة ( كار جاس ) والكائنة بشارع اسيوط بجوار قسم ثالث العريش",
      "pass_id": "معدية شرق التفريعة غرب",
      "notes": "65",
      "request_status": "تحت التنفيذ",
      "tasdek_status": "24"
  };
  test: any;
  supscription: Subscription = new Subscription;
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.supscription = this.requestService.getRequests().subscribe((requests) => {
      // console.log(requests);
      this.requests = JSON.parse(JSON.stringify(requests));
      this.dataSource.data = this.requests;
    })
  }

  displayedColumns: string[] = ['request_number', 'request_date', 'subject', 'address', 'pass_id', 'notes', 'request_status', 'tasdek_status'];
  // dataSource: Request[] = [];
  dataSource = new MatTableDataSource<Request>();
  

  addRequest() {
    this.requestService.addRequest(this.newReq).subscribe(req => {
      console.log(req);
    })
  }

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }
}
