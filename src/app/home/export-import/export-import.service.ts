import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportImportService {

  constructor(private http: HttpClient) {
    // this.getCount();
  }
  private API_URL = environment.API_URL;

  count!: number;
  requestCount: Subject<number> = new Subject();
  // isLoading = new BehaviorSubject(true);

  getCount() {
    return this.http.get<number>(this.API_URL+'get_export_count').subscribe(data => {
      this.requestCount.next(data);
      // this.isLoading.next(false);
    });
  }
}
