import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { TestService } from './test.service';
import { Pass } from '../../../Models/passes';
import { RequestItemService } from '../items.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  passes: Pass[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  supscription: Subscription = new Subscription;
  constructor(private testService: TestService, private requestItemService: RequestItemService) {}

  ngOnInit(): void {
    this.requestItemService.itemDetailId.subscribe(value => {
      console.log(value);
      this.fetchPasses(value);
    })
  }

  fetchPasses(id: number) {
    this.supscription = this.testService.getPasses(id).subscribe(value => {
      this.passes = JSON.parse(JSON.stringify(value));
      this.dataSource.data = this.passes;
    })
  }
  displayedColumns: string[] = ['pass_id', 'pass_name'];
  // dataSource: Item[] = [];
  dataSource = new MatTableDataSource<Pass>();

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }
}
