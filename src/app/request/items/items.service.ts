import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/Models/item';

@Injectable({
  providedIn: 'root'
})
export class RequestItemService {

  constructor(private http: HttpClient) { }
  getItems() {
    // return this.http.get<Item[]>('http://localhost:3000/request_items/'+reqId);
    return this.http.get<Item[]>('http://localhost:3000/request_items');
  }
}
