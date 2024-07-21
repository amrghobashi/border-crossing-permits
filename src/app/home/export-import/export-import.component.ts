import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExportImportService } from './export-import.service';
import { ExportService } from './export/export.service';

@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.css']
})
export class ExportImportComponent implements OnInit {

  subscription: Subscription = new Subscription;
  reqCount: string = '';

  constructor(private exportImportService: ExportImportService, private router: Router) { }

  ngOnInit(): void {
    this.exportImportService.getCount();
    this.getCount();
  }

  tabLinks = [{'path': 'export', 'label': 'إستخراج ملف الطلبات والأصناف', 'count': ''},
  {'path': 'import', 'label': 'رفع ملف الطلبات والأصناف ', 'count': ''},
  {'path': 'import-user', 'label': 'رفع ملف المستخدمين ', 'count': ''}];

  // activelink = this.router.url.replace("/export-import/", "");
  activelink = this.router.url.replace("/export-import/", "");

  getCount() {
    this.subscription = this.exportImportService.getCount();
    this.subscription = this.exportImportService.requestCount.subscribe(data => {
      this.reqCount = data.toString();
    this.tabLinks[0]['count'] = this.reqCount;
    })
  }

  ngDestroy() {
    this.subscription.unsubscribe();
  }

}
