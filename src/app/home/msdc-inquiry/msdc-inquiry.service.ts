import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyUser } from 'src/app/Models/company';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MsdcInquiryService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getCompanies() {
    return this.http.get<CompanyUser[]>(this.API_URL+'msdc_inquiry');
  }
}
