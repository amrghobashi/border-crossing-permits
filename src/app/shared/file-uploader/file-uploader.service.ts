import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;
  private baseUrl = this.API_URL;

  upload(file: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.API_URL + 'uploadImg', file, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getImg`);
  }

  getImages(id: number) {
    return this.http.get(this.API_URL + 'get_images/' + id);
  }

  deleteImage(path: any) {
    return this.http.post(this.API_URL + 'delete_image', path);
  }
}