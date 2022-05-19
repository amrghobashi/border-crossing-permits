import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Request} from '../Models/request'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }


  getRequests() {
    return this.http.get<Request[]>('http://localhost:3000/data');
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>('http://localhost:3000/data', request);
  }
}
