import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemType } from 'src/app/Models/itemType';
import { ItemList } from 'src/app/Models/itemList';
import { ItemUnit } from 'src/app/Models/itemUnit';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { RequestItem } from 'src/app/Models/requestItem';
import { AddItemService } from './add-item.service';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { customPaginator } from 'src/app/shared/custom-paginator';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class AddItemComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription;
  @Input() newRequestNO!: number;
  items: RequestItem[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private _formBuilder: FormBuilder, private sharedService: SharedService,
    private addItemService: AddItemService, private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.itemList();
  }

  types: ItemType[] = [];
  itemLists: ItemList[] = [];
  itemListsChem: ItemList[] = [];
  itemListsOther: ItemList[] = [];
  itemListsCopy: ItemList[] = [];
  units: ItemUnit[] = [];
  displayedColumns: string[] = ['item_type_name', 'item_list_name', 'item_unit_name', 'quantity',
    'other_details', 'actions'];
  dataSource = new MatTableDataSource<RequestItem>();
  addUpdateFlag: boolean = true;
  clickedRows = new Set();
  initialItemType: number = 1;

  ngOnInit(): void {
    this.getItems();
    this.getItemType();
    this.getUnit();
  }

  itemsFormGroup = this._formBuilder.group({
    item_id: [],
    item_type_id: ['8', [Validators.required]],
    item_list_id: ['', [Validators.required]],
    item_unit_id: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    other_details: [''],
  });

  getItems() {
    this.subscription = this.addItemService.getItems(this.newRequestNO).subscribe(value => {
      this.items = value;
      this.dataSource.data = value;
    })
  }

  getItemType() {
    this.subscription = this.sharedService.getItemTypes().subscribe(types => {
      this.types = types;
    })
  }

  itemList() {
    this.subscription = this.sharedService.getItemList(1).subscribe(list => {
      this.itemListsChem = list;
    })
    this.subscription = this.sharedService.getItemList(8).subscribe(list => {
      this.itemListsOther = this.itemLists = this.itemListsCopy = list;
    })
  }

  getItemList(id: number) {
    if (id == 1) {
      this.itemLists = this.itemListsCopy = this.itemListsChem;
    }
    else {
      this.itemLists = this.itemListsCopy = this.itemListsOther;
    }
  }

  onKey(event: any) {
    let keyValue = event.target.value;
    this.searchItem(keyValue);
  }

  searchItem(value: string) {
    let filter = value.toLocaleLowerCase();
    this.itemLists = this.itemListsCopy.filter(lists => lists.item_list_name.toLocaleLowerCase().startsWith(filter))
  }

  getUnit() {
    this.subscription = this.sharedService.getUnits().subscribe(units => {
      this.units = units;
    })
  }

  editRow(item: RequestItem) {
    this.getItemList(item.item_type_id);
    this.clickedRows = new Set();
    this.itemsFormGroup = this._formBuilder.group({
      item_id: [item.item_id],
      item_type_id: [String(item.item_type_id)],
      item_list_id: [item.item_list_id],
      item_unit_id: [item.item_unit_id],
      quantity: [item.quantity],
      other_details: [item.other_details]
    });
    this.addUpdateFlag = false;
  }

  addItem() {
    if (this.itemsFormGroup.valid) {
      const newItem: RequestItem = this.itemsFormGroup.value;
      newItem['request_id'] = this.newRequestNO;
      this.subscription = this.addItemService.addItem(newItem).subscribe(value => {
        this.getItems();
        this.reset();
        this.openConfirmMsg("uploaded successfully");
      })
    }
  }

  updateItem() {
    if (this.itemsFormGroup.valid && this.itemsFormGroup.value['quantity'] != null) {
      const updatedItem: RequestItem = this.itemsFormGroup.value;
      this.subscription = this.addItemService.updateItem(updatedItem).subscribe(value => {
        this.getItems();
        this.reset();
        this.openConfirmMsg("updated successfully");
        this.addUpdateFlag = true;
      })
    }
  }

  deleteRow(item: RequestItem) {
    this.clickedRows = new Set();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        msg: "confirm delete?",
        type: "delete"
      }
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value === 1)
        this.subscription = this.addItemService.deleteItem(item.item_id).subscribe(value => {
          this.getItems();
          this.openConfirmMsg("deleted successfully");
          this.reset();
        })
    })
  }

  onTypeChange(id: number) {
    this.getItemList(id);
  }

  showErrorMsg(field: string) {
    if (field === 'item_type_id') {
      return 'item type is required';
    }
    else if (field === 'item_list_id') {
      return 'item name is required';
    }
    else if (field === 'item_unit_id') {
      return 'measurment unit is required';
    }
    else if (field === 'quantity') {
      return 'quantity is required';
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
    this.clickedRows = new Set();
    this.addUpdateFlag = true;
    this.itemsFormGroup = this._formBuilder.group({
      item_type_id: ['1', [Validators.required]],
      item_list_id: ['', [Validators.required]],
      item_unit_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      other_details: [''],
    });
    this.getItemList(1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
