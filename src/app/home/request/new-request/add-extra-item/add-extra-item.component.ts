import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ItemType } from 'src/app/Models/itemType';
import { ItemList } from 'src/app/Models/itemList';
import { ItemUnit } from 'src/app/Models/itemUnit';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { RequestItem } from 'src/app/Models/requestItem';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { customPaginator } from 'src/app/shared/custom-paginator';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog'
import { AddExtraItemService } from './add-extra-item.service';

@Component({
  selector: 'app-add-extra-item',
  templateUrl: './add-extra-item.component.html',
  styleUrls: ['./add-extra-item.component.css'],
  providers: [
    {provide: MatPaginatorIntl, useValue: customPaginator()}
  ]
})
export class AddExtraItemComponent implements OnInit {
  subscription: Subscription = new Subscription;
  @Input() newRequestNO!: number;
  items: RequestItem[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private _formBuilder: FormBuilder, private sharedService: SharedService, private addExtraItemService: AddExtraItemService, private _snackBar: MatSnackBar,
     public dialog: MatDialog) { }
  
  types: ItemType[] = [];
  itemLists: ItemList[] = [];
  units: ItemUnit[] = [];
  // itemSelected!: RequestItem;
  displayedColumns: string[] = ['item_name', 'item_unit_name', 'quantity', 'other_details','actions'];
  dataSource = new MatTableDataSource<RequestItem>();
  addUpdateFlag: boolean = true;
  clickedRows = new Set();
  isLoading = true;
  
  ngOnInit(): void {
    this.getItems();
    this.getUnit();
  }

  extraItemsFormGroup = this._formBuilder.group({
    item_id: [],
    item_name: ['', [Validators.required]],
    item_unit_id: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    other_details: [''],
  });

  getItems() {
    this.subscription = this.addExtraItemService.getItems(this.newRequestNO).subscribe(value => {
      this.items = value;
      this.dataSource.data = value;
      this.isLoading = false;
    })
  }

  getUnit() {
    this.subscription = this.sharedService.getUnits().subscribe(units => {
      this.units = units;
    })
  }

  editRow(item: RequestItem) {
    this.clickedRows = new Set();
    this.extraItemsFormGroup = this._formBuilder.group({
      item_id: [item.item_id],
      item_name: [item.item_name],
      item_unit_id: [item.item_unit_id],
      quantity: [item.quantity],
      other_details: [item.other_details]
    });
    this.addUpdateFlag = false;
  }

  addItem() {
    if(this.extraItemsFormGroup.valid) {
      const newItem: RequestItem = this.extraItemsFormGroup.value;
      newItem['request_id'] = this.newRequestNO;
      // console.log(newItem)
      this.subscription = this.addExtraItemService.addItem(newItem).subscribe(value => {
        this.getItems();
        this.reset();
        this.openConfirmMsg("تم إضافة الصنف بنجاح");
      })
    }
  }

  updateItem() {
    // console.log(this.extraItemsFormGroup) 
    // console.log(this.extraItemsFormGroup.get('quantity')?.value)
    if(this.extraItemsFormGroup.valid && this.extraItemsFormGroup.value['quantity'] != null && this.extraItemsFormGroup.value['item_name'] != "") {
      const updatedItem: RequestItem = this.extraItemsFormGroup.value;
      this.subscription = this.addExtraItemService.updateItem(updatedItem).subscribe(value => {
        this.getItems();
        this.reset();
        this.openConfirmMsg("تم التعديل بنجاح");
        this.addUpdateFlag = true;
      })
    }
  }

  deleteRow(item: RequestItem) {
    // this.dialog.open(DialogComponent);
    this.clickedRows = new Set();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        msg: "تأكيد الحذف؟",
        type: "delete"
      }
    });

    dialogRef.afterClosed().subscribe(value => {
      if(value === 1)
        this.subscription = this.addExtraItemService.deleteItem(item.item_id).subscribe(value => {
          this.getItems();
          this.openConfirmMsg("تم حذف الصنف");
          this.reset();
        })
    })
  }

  showErrorMsg(field: string) {
    if(field === 'item_name') {
      // if(this.extraItemsFormGroup.get('item_list_id')?.hasError('required'))
        return 'إسم الصنف خانة إجبارية';
    }
    else if(field === 'item_unit_id') {
      // if(this.extraItemsFormGroup.get('pass_id')?.hasError('required'))
        return 'وحدة القياس خانة إجبارية';
    }
    else if(field === 'quantity') {
      // if(this.extraItemsFormGroup.get('pass_id')?.hasError('required'))
        return 'الكمية خانة إجبارية';
    }
    else return;
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

  reset() {
    // this.extraItemsFormGroup.reset();
    this.clickedRows = new Set();
    this.addUpdateFlag = true;
    this.extraItemsFormGroup = this._formBuilder.group({
      item_name: ['', [Validators.required]],
      item_unit_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      other_details: [''],
    });
  }
  // formFlag: boolean = false;

  // openForm() {
  //   this.extraItemsFormGroup = this._formBuilder.group({
  //     item_id: [],
  //     item_type_id: ['', [Validators.required]],
  //     item_list_id: ['', [Validators.required]],
  //     item_unit_id: ['', [Validators.required]],
  //     quantity: ['', [Validators.required]],
  //     other_details: [''],
  //   });
  //   this.formFlag = !this.formFlag;
  //   console.log(this.formFlag)
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
