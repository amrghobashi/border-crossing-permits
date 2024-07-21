import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelUploaderService {
  private baseUrl = 'http://localhost/passApi/public/api';

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  upload(file: any, url: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.API_URL + url, file, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
