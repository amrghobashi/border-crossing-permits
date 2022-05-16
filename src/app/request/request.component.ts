import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
// import { Request } from '../Models/request';

export interface Request{
  request_number?: number;
  request_date?: string;
  subject?: string;
  address?: string;
  pass_id?: string;
  notes?: string;
  request_status?: string;
  tasdek_status?: string;
  tasdek_detail?: string;
}

const ELEMENT_DATA: Request[] = [
  {request_number: 1000,
   request_date: '2021/11/14',
   subject: 'نقل خامات تحويل السيارات للعمل بالغاز الطبيعى وعدد يدوية وأثاث مكتبى وجهاز كمبيوتر كامل بالاستاند الحديد',
   address: ' محطة الغاز الطبيعى للسيارات التابعة لشركة ( كار جاس ) والكائنة بشارع اسيوط بجوار قسم ثالث العريش',
   pass_id: 'معدية شرق التفريعة غرب',
   notes: '65',
   request_status: 'تحت التنفيذ',
   tasdek_status: 'تحت التنفيذ',
   tasdek_detail: 's'
  },
  {request_number: 1001, request_date: '2021/11/14',
   subject: 'نقل خامات تحويل السيارات للعمل بالغاز الطبيعى وعدد يدوية وأثاث مكتبى وجهاز كمبيوتر كامل بالاستاند الحديد',
   address: ' محطة الغاز الطبيعى للسيارات التابعة لشركة ( كار جاس ) والكائنة بشارع اسيوط بجوار قسم ثالث العريش',
   pass_id: 'معدية شرق التفريعة غرب', notes: '65', request_status: 'تحت التنفيذ',
   tasdek_status: 'تحت التنفيذ', tasdek_detail: 's'
  },
  {request_number: 1002, request_date: '2021/11/14',
   subject: 'نقل خامات تحويل السيارات للعمل بالغاز الطبيعى وعدد يدوية وأثاث مكتبى وجهاز كمبيوتر كامل بالاستاند الحديد',
   address: ' محطة الغاز الطبيعى للسيارات التابعة لشركة ( كار جاس ) والكائنة بشارع اسيوط بجوار قسم ثالث العريش',
   pass_id: 'معدية شرق التفريعة غرب', notes: '65', request_status: 'تحت التنفيذ',
   tasdek_status: 'تحت التنفيذ', tasdek_detail: 'Amr Aly Ghobashi'
  },
];
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requests: Request[] = [];

  constructor() {}

  ngOnInit() {
    
  }
  displayedColumns: string[] = ['request_number', 'request_date', 'subject', 'address', 'pass_id', 'notes', 'request_status', 'tasdek_status', 'tasdek_detail'];
  dataSource = ELEMENT_DATA;
  // fetchRequests() {
  //   this.requestService.getRequests().then(data => this.requests = data)
  // }
}
