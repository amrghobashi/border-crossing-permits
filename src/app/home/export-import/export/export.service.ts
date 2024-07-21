import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }   
  private API_URL = environment.API_URL;

  getCount() {
    return this.http.get<number>(this.API_URL+'get_export_count');
  }

  exportRequests() {
    return this.http.get(this.API_URL+'export_requests');
  }

  exportItems() {
    return this.http.get(this.API_URL+'export_request_items');
  }

  confirmExport() {
    return this.http.get(this.API_URL+'confirm_export');
  }
}
