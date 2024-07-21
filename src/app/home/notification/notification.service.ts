import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getNotification(): Observable<Notification> {
    return this.http.get<Notification>(this.API_URL+'notification');
  }

  updateNotification(notif: Notification) {
    return this.http.put<Notification>(this.API_URL+'notification/0', notif); 
  }
}
