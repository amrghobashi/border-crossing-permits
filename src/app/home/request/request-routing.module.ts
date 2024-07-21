import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../login/auth.guard";
import { CompletedRequestComponent } from './completed-request/completed-request.component';
import { ItemsComponent } from './items/items.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { RequestComponent } from './request.component';

const requestRoutes: Routes = [
    // { path: '', redirectTo: 'requests', pathMatch: 'full'},
    // { path: 'requests', redirectTo: 'requests/pending-requests', pathMatch: 'full'},
    { path: '', component: RequestComponent, canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        children: [
        {path: '', redirectTo: 'pending-requests', pathMatch: 'full'},
        {path: 'pending-requests', component: PendingRequestComponent},
        {path: 'completed-requests', component: CompletedRequestComponent},
        {path: 'new-request', component: NewRequestComponent},
        {path: 'items-component', component: ItemsComponent},
        { path: '**', redirectTo: 'pending-requests', pathMatch: 'full'},
        ]
    },
    // { path: 'requests', redirectTo: 'pending-requests', pathMatch: 'full'},

  ];

  @NgModule({
    imports: [RouterModule.forChild(requestRoutes)],
    exports: [RouterModule]
  })

  export class RequestRoutingModule {}