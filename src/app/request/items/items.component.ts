import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../Models/item';
import { Request } from '../../Models/request';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestDetailService } from '../request-detail/request-detail.service';
import { RequestItemService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  supscription: Subscription = new Subscription;
  constructor(private requestItemService: RequestItemService) {}

  ngOnInit() {
    this.supscription = this.requestItemService.getItems().subscribe((items) => {
      this.items = JSON.parse(JSON.stringify(items));
      // this.dataSource.data = this.items;
      // console.log(this.items);
    })
  }

  // displayedColumns: string[] = ['item_name', 'item_type_name', 'measure_unit', 'quantity', 'notes', 'item_status_name'];
  displayedColumns: string[] = ['item_name','item_type_name','measure_unit','quantity','notes','item_status_name',];
  // dataSource: Request[] = [];
  dataSource = new MatTableDataSource<Request>();

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }

}
