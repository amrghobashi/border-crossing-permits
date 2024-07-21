import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Request } from 'src/app/Models/request';
import { RequestItem } from 'src/app/Models/requestItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getRequests(reqId: number): Observable<Request> {
    return this.http.get<Request>(this.API_URL+'requests/' +reqId);
  }
  
  getItems(reqId: number) {
    // return this.http.get<Request[]>('http://localhost:3000/pending_requests/'+reqId);
  }
}
