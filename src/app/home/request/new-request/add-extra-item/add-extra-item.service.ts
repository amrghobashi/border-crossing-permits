import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestItem } from 'src/app/Models/requestItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddExtraItemService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getItems(id: number) {
    return this.http.get<RequestItem[]>(this.API_URL+'get_extra_items/' +id);
  }
  
  addItem(item: RequestItem) {
    return this.http.post<RequestItem>(this.API_URL+'extra-items', item);
  }

  updateItem(item: RequestItem) {
    return this.http.put<RequestItem>(this.API_URL+'extra-items/' +item.item_id, item);
    // console.log(item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.API_URL+'extra-items/' +id);
  }
}
