import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyUser } from 'src/app/Models/company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getCompanies() {
    return this.http.get<CompanyUser[]>(this.API_URL+'company-user');
  }

  updateActiveFlag(company: CompanyUser) {
    return this.http.put<CompanyUser>(this.API_URL+'company-user/' +company.company_id, company);
  }

  getCompanyName(id: number) {
    return this.http.get<any>(this.API_URL+'company-user/' +id);

  }
}
