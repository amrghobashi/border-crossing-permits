import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestService {

  constructor(private http: HttpClient) { }

  getRequests() {
    return this.http.get<Request[]>('http://localhost:3000/pending_requests');
  }
}
