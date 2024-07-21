import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestItem } from 'src/app/Models/requestItem';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestItemService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  itemDetailId = new Subject<number>();
  getItems(reqId: number): Observable<RequestItem[]> {
    return this.http.get<RequestItem[]>(this.API_URL+'get_finished_request_items/' +reqId);
  }
}
