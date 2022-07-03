import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../Models/item';
import { Request } from '../../Models/request';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestDetailService } from '../request-detail/request-detail.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  requests: [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  supscription: Subscription = new Subscription;
  constructor(private requestDetailService: RequestDetailService) {}

  ngOnInit() {
    this.supscription = this.requestDetailService.getRequests(1).subscribe((items) => {
      // console.log(items);
      this.requests = JSON.parse(JSON.stringify(items));
      this.dataSource.data = this.requests;
      console.log(this.requests);
    })
  }

  // displayedColumns: string[] = ['item_name', 'item_type_name', 'measure_unit', 'quantity', 'notes', 'item_status_name'];
  displayedColumns: string[] = ['request_number'];
  // dataSource: Request[] = [];
  dataSource = new MatTableDataSource<Request>();

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }

}
