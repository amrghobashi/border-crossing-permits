import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import {Request} from '../Models/request'


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }


  // getRequests() {
  //   return this.http.get<any>('assets/requests.json')
  //   .toPromise()
  //   .then(res => <Request[]>res.data)
  //   .then(data => { return data; });
  // }
}
