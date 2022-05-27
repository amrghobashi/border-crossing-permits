import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Request} from '../../Models/request'

@Injectable({
  providedIn: 'root'
})
export class CompletedRequestService {

  constructor(private http: HttpClient) { }

  getRequests() {
    return this.http.get<Request[]>('http://localhost:3000/closed_requests');
  }

}
