import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Request} from '../Models/request'
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  reqId!: number;
  status: boolean = false;

  getRequests() {
    return this.http.get<Request[]>('http://localhost:3000/data');
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>('http://localhost:3000/data', request);
  }

  detailId = new BehaviorSubject(this.reqId);
  detailStatus = new BehaviorSubject(this.status);
}
