import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailService {

  constructor(private http: HttpClient) { }

  getRequests(reqId: number) {
    return this.http.get<Request[]>('http://localhost:3000/pending_requests/'+reqId);
  }
}
