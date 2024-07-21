import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CompanyUser } from 'src/app/Models/company';
import { MsdcInquiryService } from './msdc-inquiry.service';

@Component({
  selector: 'app-msdc-inquiry',
  templateUrl: './msdc-inquiry.component.html',
  styleUrls: ['./msdc-inquiry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MsdcInquiryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  @Input() isCompletedReq = false;
  displayedColumns: string[] = ['company_name', 'user_name', 'user_pass', 'active'];

  dataSource = new MatTableDataSource<CompanyUser>();
  isLoading = true;

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  constructor(private msdcInquiryService: MsdcInquiryService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.subscription = this.msdcInquiryService.getCompanies().subscribe(value => {
      this.isLoading = false;
      this.dataSource.data = value;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 2000)
    })
  }

  searchCompany(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
