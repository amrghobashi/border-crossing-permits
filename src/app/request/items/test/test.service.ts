import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pass } from 'src/app/Models/passes';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getPasses(id: number) {
    // return this.http.get<Item[]>('http://localhost:3000/request_items/'+reqId);
    return this.http.get<Pass[]>('http://localhost:3000/passes');
  }
}
