import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { ToolBarComponent } from './shared/tool-bar/tool-bar.component';
import { CompletedRequestComponent } from './request/completed-request/completed-request.component';
import { NewRequestComponent } from './request/new-request/new-request.component';
import { PendingRequestComponent } from './request/pending-request/pending-request.component';
import { RequestDetailComponent } from './request/request-detail/request-detail.component';
import { ItemsComponent } from './request/items/items.component';
import { TestComponent } from './request/items/test/test.component';

const routes: Routes = [
  {path: 'tool-bar-component', component: ToolBarComponent},
  {path: 'request-component', component: RequestComponent,
    children: [
      {path: 'completed-request-component', component: CompletedRequestComponent,},
      {path: 'new-request-component', component: NewRequestComponent},
      {path: 'pending-request-component', component: PendingRequestComponent},
      {path: 'request-detail-component', component: RequestDetailComponent},
      {path: 'items-component', component: ItemsComponent},
      {path: 'test-component', component: TestComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
