import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.css']
})
export class ConfirmMessageComponent implements OnInit {

  supscription: Subscription = new Subscription;
  msg: string = '';
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.supscription = this.sharedService.msg.subscribe(value => {
      this.msg = value
    })
  }

}
