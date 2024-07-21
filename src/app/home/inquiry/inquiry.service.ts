import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getRequest(request_id: number) {
    return this.http.get(this.API_URL+'inquiry/' +request_id);
  }

}
