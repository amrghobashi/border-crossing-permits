import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Request} from '../../Models/request'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  reqId!: number;
  status: boolean = false;
  isDetail = new BehaviorSubject(false);
  redirectFromNew = new BehaviorSubject(false);

  getRequests() {
    return this.http.get<Request[]>('http://localhost:3000/data');
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>('http://localhost:3000/data', request);
  }

  getCount() {
    return this.http.get<number>(this.API_URL+'get_count');
  }

  detailId = new BehaviorSubject(this.reqId);
  det = of(this.reqId);
  detailStatus = new BehaviorSubject(this.status);
}
