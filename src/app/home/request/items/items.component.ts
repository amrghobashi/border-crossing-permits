import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RequestItem } from '../../../Models/requestItem';
import { Subscription, exhaustMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestItemService } from './items.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: RequestItem[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription = new Subscription;
  @Input() requestNo!: number;
  @Input() isCompletedReq = false;
  displayedColumns!: string[];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private requestItemService: RequestItemService, private requestService: RequestService) {}

  ngOnInit() {
    this.fetchItems();
  }

  // fetchItems() {
  //   this.subscription = this.requestItemService.getItems().subscribe((items) => {
  //     this.items = JSON.parse(JSON.stringify(items));
  //     this.dataSource.data = this.items;
  //     // console.log(this.items);
  //   })
  // }

  fetchItems() {
    // this.subscription = this.requestService.detailId.pipe(
    //   exhaustMap( req_id => {
    //     return this.requestItemService.getItems(req_id)
    //   })
    // ).subscribe(items => {
    //   this.items = items;
    //   this.dataSource.data = items;
    //   if(!this.isCompletedReq) {
    //     this.displayedColumns = ['item_list_name', 'item_unit_name', 'quantity', 'other_details'];
    //   }
    //   else {
    //     this.displayedColumns = ['item_list_name', 'item_unit_name', 'quantity', 'other_details', 'response_name'];
    //   }
    // })

    this.subscription = this.requestItemService.getItems(this.requestNo).subscribe(items => {
      this.items = items;
      this.dataSource.data = items;
      // console.log(this.items);
      if(!this.isCompletedReq) {
        this.displayedColumns = ['item_list_name', 'item_unit_name', 'quantity', 'other_details'];
      }
      else {
        this.displayedColumns = ['item_list_name', 'item_unit_name', 'quantity', 'other_details', 'response_name'];
      }
    })
  }

  // dataSource: Item[] = [];
  dataSource = new MatTableDataSource<RequestItem>();
  clickedRows = new Set<RequestItem['item_id']>();
  it!: number;

  onClick(id: number): void {
    this.clickedRows = new Set();
    // this.it = id;
    this.requestItemService.itemDetailId.next(id);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
