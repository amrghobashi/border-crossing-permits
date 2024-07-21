import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from '../../../Models/request';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  pendingDetailStatus = new BehaviorSubject(false);

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.API_URL+'pending');
  }

  searchRequests(reqId: number): Observable<Request[]> {
    return this.http.get<Request[]>(this.API_URL+'search_requests/' +reqId);
  }
}
