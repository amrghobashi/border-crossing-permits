import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pass } from 'src/app/Models/passes';
import { NewRequestService } from './new-request.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit, OnDestroy {

  firstFormGroup = this._formBuilder.group({
    subject: [''],
    address: [''],
    pass_id: [''],
    r_notes: [''],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  supscription: Subscription = new Subscription;
  passes: Pass[] = [];
  newRequest!: Request;

  constructor(private _formBuilder: FormBuilder, private newRequestService: NewRequestService) {}

  ngOnInit(): void {
    this.getPasses();
  }
  // isEditable = false;

  getPasses() {
    this.supscription = this.newRequestService.getPasses().subscribe(passes => {
      this.passes = passes;
      // console.log(this.passes);
    })
  }

  addRequest() {
    // console.log(this.newRequest);
    this.newRequest = this.firstFormGroup.value;
    // console.log(this.newRequest);
    this.supscription = this.newRequestService.addReqeust(this.firstFormGroup.value).subscribe(value => {
      console.log(value);
    })
  }

  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }
}
