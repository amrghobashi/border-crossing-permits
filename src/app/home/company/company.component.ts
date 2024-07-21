import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CompanyUser } from 'src/app/Models/company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  @Input() isCompletedReq = false;
  displayedColumns: string[] = ['company_name', 'user_name', 'active'];

  dataSource = new MatTableDataSource<CompanyUser>();
  isLoading = true;

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.subscription = this.companyService.getCompanies().subscribe(value => {
      this.isLoading = false;
      this.dataSource.data = value;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 2000)
    })
  }

  changeActiveFlag(company: CompanyUser, event: any) {
    if(event.checked === true) company.active_flag = 1;
    else company.active_flag = 0;
    this.subscription = this.companyService.updateActiveFlag(company).subscribe();
  }

  searchCompany(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
