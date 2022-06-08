import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailService {

  constructor() { }
  status: boolean = false;
  detailStatus = new BehaviorSubject(this.status);
  detailId = new BehaviorSubject(0);
}
