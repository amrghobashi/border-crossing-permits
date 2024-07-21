import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { Pass } from 'src/app/Models/passes';
import { NewRequestService } from './new-request.service';
import { Request } from '../../../Models/request';
import { SharedService } from 'src/app/shared/shared.service';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription;
  passes: Pass[] = [];
  newReqStatus: boolean = false;
  isLoading: boolean = true;
  newRequest!: Request;
  newRequestNO!: number;
  msg: string = 'update';
  public filterControl: FormControl = new FormControl('');
  imgSelected!: File;
  stepperOrientation: Observable<StepperOrientation>
  noItemsMsg = false;
  requestSent = false;
  

  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  stepperIndex: number = 0;
  stepperIndex0: boolean = true;
  stepperIndex1: boolean = false;
  stepperIndex2: boolean = false;
  stepperClick(index: number) {
    this.stepperIndex = index;
    if(index == 1 && this.stepperIndex1 == false) this.stepperIndex1 = true;
    if(index == 2 && this.stepperIndex2 == false) this.stepperIndex2 = true;
  }

  constructor(private _formBuilder: FormBuilder, private newRequestService: NewRequestService,
    private _snackBar: MatSnackBar, private sharedService: SharedService,
    private requestService: RequestService, private router: Router,
    breakpointObserver: BreakpointObserver) {
      this.getNotCompleted();
      this.stepperOrientation = breakpointObserver.observe('(min-width: 900px)').pipe(
        map(({matches}) => (matches ? 'horizontal' : 'vertical')
      ));
  }

  firstFormGroup = this._formBuilder.group({});
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  imgFormGroup = this._formBuilder.group({});

  ngOnInit(): void {
    this.getPasses();
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.passes.filter(option => option.pass_name.toLowerCase().includes(filter));
  }

  getNotCompleted() {
    this.subscription = this.newRequestService.getNotCompleted().subscribe(req => {
      if(req) {
        this.newRequestNO = req.request_id;
        this.newReqStatus = true;
        this.isLoading = false;
        this.newRequest = req;
        this.firstFormGroup = this._formBuilder.group({
          subject: [this.newRequest.subject, [Validators.required, Validators.maxLength(450), Validators.minLength(10)]],
          address: [this.newRequest.address, [Validators.required, Validators.maxLength(450), Validators.minLength(10)]],
          pass_id: [this.newRequest.pass_id, [Validators.required]],
          r_notes: [this.newRequest.r_notes, [Validators.maxLength(250)]],
        });
      }
      else {
        this.newReqStatus = false;
        this.firstFormGroup = this._formBuilder.group({
          subject: ['', [Validators.required, Validators.maxLength(450), Validators.minLength(10)]],
          address: ['', [Validators.required, Validators.maxLength(450), Validators.minLength(10)]],
          pass_id: ['', [Validators.required]],
          r_notes: ['', [Validators.maxLength(250)]],
        });
        this.isLoading = false;
      }
    })
  }

  getPasses() {
    this.subscription = this.newRequestService.getPasses().subscribe(passes => {
      this.passes = passes;
    })
  }

  addRequest() {
    if(this.firstFormGroup.valid) {
      this.isLoading = true;
      this.newRequest = this.firstFormGroup.value;
      this.subscription = this.newRequestService.addReqeust(this.newRequest).subscribe(value => {
        this.newReqStatus = true;
        this.isLoading = false;
        this.newRequestNO = value.request_id;
        this.openConfirmMsg("added successfully");
      })
    }
  }

  updateRequest() {
    if(this.firstFormGroup.valid) {
      this.newRequest = this.firstFormGroup.value;
      this.newRequest.request_id = this.newRequestNO;
      this.isLoading = true;
      this.subscription = this.newRequestService.updateReqeust( this.newRequest).subscribe(value => {
      this.isLoading = false;
        this.openConfirmMsg("updated successfully");
      })
    }
  }

  showErrorMsg(field: string) {
    if(field === 'subject') {
      if(this.firstFormGroup.get('subject')?.hasError('required'))
        return 'subject is required';
      else return 'subject must be at least 10 characters.';
    }
    else if(field === 'address') {
      if(this.firstFormGroup.get('address')?.hasError('required'))
        return 'address is required';
      else return 'address must be at least 10 characters.';
    }
    else if(field === 'pass_id') {
      if(this.firstFormGroup.get('pass_id')?.hasError('required'))
        return 'gate is required';
      else return;
    }
    else if(field === 'r_notes') {
      if(this.firstFormGroup.get('pass_id')?.hasError('required'))
         return 'notes must be not exceeded than 250 characters.';
      else return;
    }
    else return;
  }

  openConfirmMsg(msg: string) {
    this.sharedService.msg.next(msg);
    this._snackBar.openFromComponent(ConfirmMessageComponent, {
      duration: 3000,
    })
  }

  countReqeustItems(id: number) {
    this.subscription = this.newRequestService.checkRequest(id).subscribe(data => {
      if(data) {
        this.sendRequest();
      }
      else {
        this.noItemsMsg = true;
        setTimeout(() => {
          this.noItemsMsg = false;
        }, 4000)
      }
    })
  }

  sendRequest() {
    setTimeout(() => {
      this.requestService.redirectFromNew.next(true);
    }, 3500)
    this.subscription = this.newRequestService.sendReqeust(this.newRequest).subscribe(() => {
      this.requestSent = true;
      this.sharedService.msg.next("request has been sent, you will be directed now to the main page");
      this._snackBar.openFromComponent(ConfirmMessageComponent, {
        duration: 4000,
      });
      setTimeout(() => {
        this.router.navigateByUrl('requests/pending-requests');
      }, 4000)
    })
  }

  onSelectFile(fileInputEvent: any) {
    this.imgSelected = fileInputEvent.target.files[0];
  }

  onSubmitFile() {
    let object = this.imgFormGroup.value;
    let imgForm = new FormData();
    imgForm.append("imgForm", JSON.stringify(object));
    imgForm.append('testInput', 'test');
    imgForm.append('testimg', this.imgSelected, this.imgSelected.name);
    this.newRequestService.addImg(imgForm).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
