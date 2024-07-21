import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from 'src/app/Models/request';
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
  
}
