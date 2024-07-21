import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RequestService } from '../request/request.service';
import { InquiryService } from './inquiry.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private requestService: RequestService, private inquiryService: InquiryService) { }

  subscription: Subscription = new Subscription;
  detailStatus: boolean = false;
  requestNo!: number;
  isLoading = false
  firstFormGroup = this._formBuilder.group({search: ['',[Validators.required]]});
  wrongNo = false;

  ngOnInit(): void {
  }

  searchReq() {
    if(this.firstFormGroup.valid) {
      this.requestNo = this.firstFormGroup.value.search;
      this.subscription = this.inquiryService.getRequest(this.requestNo).subscribe(data => {
        if(data === 1) {
          this.wrongNo = false;
          this.requestService.detailId.next(this.requestNo);
          this.subscription = this.requestService.detailId.subscribe();
          this.requestService.detailStatus.next(true);
          this.requestService.isDetail.next(true);
          this.getStatus();
        }
        else {
          this.wrongNo = true;
        }
      })
    }
  }

  getStatus() {
    // this.requestService.detailId.subscribe(id => {
    //   this.detailId = id;
    // })
    this.subscription = this.requestService.isDetail.subscribe(data => {
      this.detailStatus = data;
    })
  }

}
