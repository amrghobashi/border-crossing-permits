import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { ExportService } from './export.service';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { ComponentCanDeactivate } from 'src/app/shared/component-can-deactivate';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { ExportImportService } from '../export-import.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent extends ComponentCanDeactivate  {
  constructor(private exportService: ExportService, private exportImportService: ExportImportService, private sharedService: SharedService, private _snackBar: MatSnackBar) {
    super();
  }

  // @HostListener('window:beforeunload', ['$event'])
  // doSomething($event: any) {
  //   if(this.isValid) $event.returnValue = 'sssssssss';
  // }

  // window.onbeforeunload = function() {
  //   return "sssssssss"
  // }
  
  selectedIndex: number = 0;
  subscription: Subscription = new Subscription;
  isLoading = true;
  public isValid = true;
  zeroReq = false;

  ngOnInit(): void {
    // this.exportImportService.getCount()
    this.checkIfZero();
  }

  changeIndex(index: number) {
    this.selectedIndex = index;
  }

  downloadExcel(data: any, fileName: string): void {
    // this.exportService.exportRequests().subscribe((data: any) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, fileName + '.xlsx');
      this.isLoading = false;
    // });
  }

  exportRequests() {
    this.isLoading = true;
    this.subscription = this.exportService.exportRequests().subscribe(data => {
      const currentDate = this.getCurrentDate();
      const name = "الطلبات-من-الإنترنت" + currentDate;
      this.downloadExcel(data, name);
      this.isValid = false;
      this.changeIndex(1);
      // this.exportImportService.getCount();
      this.openConfirmMsg("تم استخراج ملف الطلبات بنجاح");
    })
  }

  exportItems() {
    this.isLoading = true;
    this.subscription = this.exportService.exportItems().subscribe(data => {
      // console.log(data);
      const currentDate = this.getCurrentDate();
      const name = "الأصناف-من-الإنترنت" + currentDate;
      this.downloadExcel(data, name);
      this.isValid = false;
      this.changeIndex(2);
      this.openConfirmMsg("تم استخراج ملف الأصناف بنجاح");
    })
  }

  confirmExport() {
    this.isLoading = true;
    this.subscription = this.exportService.confirmExport().subscribe(() => {
      // console.log(data);
      const currentDate = this.getCurrentDate();
      this.isValid = true;
      this.isLoading = false;
      // this.changeIndex(0);
      this.openConfirmMsg("تم تأكيد الاستخراج بنجاح");
      this.exportImportService.getCount();
    })
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

  canDeactivate():boolean {    
    if(this.isValid === true)
    {
      return true;
    }
    return false;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const currentDate = '-' + day + '-' + month + '-' + year;
    return currentDate;
  }

  checkIfZero() {
    this.subscription = this.exportImportService.requestCount.subscribe(data => {
      if(data == 0) {
        this.zeroReq = true;
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
