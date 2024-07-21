import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pass } from '../../../Models/passes';
import { Request } from '../../../Models/request';

@Injectable({
  providedIn: 'root'
})
export class NewRequestService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getNotCompleted(): Observable<Request> {
    return this.http.get<Request>(this.API_URL+'not_completed');
  }

  addReqeust(request: Request) {
    return this.http.post<Request>(this.API_URL+'requests', request); 
  }

  addImg(img: any) {
    return this.http.post(this.API_URL+'uploadImg', img); 
  }

  updateReqeust(request: Request) {
    return this.http.put<Request>(this.API_URL+'requests/' +request.request_id, request); 
  }

  checkRequest(id: number) {
    return this.http.get(this.API_URL+'check_request/' +id);
  }

  sendReqeust(request: Request) {
    return this.http.put<Request>(this.API_URL+'send_request/' +request.request_id, request); 
  }

  getPasses() {
    return this.http.get<Pass[]>(this.API_URL+'get_passes');
  }
}
