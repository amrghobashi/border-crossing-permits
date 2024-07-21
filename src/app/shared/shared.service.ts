import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ItemType } from 'src/app/Models/itemType';
import { ItemList } from 'src/app/Models/itemList';
import { ItemUnit } from 'src/app/Models/itemUnit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  msg = new BehaviorSubject("");

  getItemTypes() {
    return this.http.get<ItemType[]>(this.API_URL+'get_item_type');
  }

  getItemList(id: number) {
    return this.http.get<ItemList[]>(this.API_URL+'get_item_list/' +id);
  }

  getUnits() {
    return this.http.get<ItemUnit[]>(this.API_URL+'get_unit');
  }
}
