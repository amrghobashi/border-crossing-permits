import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pass } from '../../Models/passes';
import { Request } from '../../Models/request';

@Injectable({
  providedIn: 'root'
})
export class NewRequestService {

  constructor(private http: HttpClient) { }

  addReqeust(request: Request) {
    return this.http.post('http://localhost:3000/new_requests', request); 
  }
  getPasses() {
    return this.http.get<Pass[]>('http://localhost:3000/passes');
  }
}
