import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Request } from '../../Models/request';
import { Subscription } from 'rxjs';
import { PendingRequestService } from './pending-request.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit, OnDestroy, AfterViewInit {

  requests: Request[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  supscription: Subscription = new Subscription;
  currentState!: number;

  constructor(private _formBuilder: FormBuilder, private pendingRequestService: PendingRequestService) {}

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.fetchRequest();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  fetchRequest() {
    this.supscription = this.pendingRequestService.getRequests().subscribe((requests) => {
      this.requests = JSON.parse(JSON.stringify(requests));
      console.log(requests);
    })
  }

  ngOnDestroy(): void {
    this.supscription.unsubscribe();
    
  }
}