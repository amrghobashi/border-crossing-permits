import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/home/notification/notification.service';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html'
})
export class MarqueeComponent implements OnInit {

  subscription: Subscription = new Subscription;
  notification!: any;
  notifName: string = '';
  
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotification().subscribe(value => {
      this.notification = value;
      this.notifName = this.notification.notification_name;
    })
  }

}
