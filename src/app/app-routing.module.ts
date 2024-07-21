import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';
import { CompanyComponent } from './home/company/company.component';
import { NotificationComponent } from './home/notification/notification.component';
import { InquiryComponent } from './home/inquiry/inquiry.component';
import { MsdcInquiryComponent } from './home/msdc-inquiry/msdc-inquiry.component';

const routes: Routes = [
  // { path:'', redirectTo: 'home', pathMatch:'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)
  // },
  {
    path: 'requests',
    loadChildren: () => import('./home/request/request-routing.module').then(m => m.RequestRoutingModule)
  },
  {
    path: 'export-import',
    loadChildren: () => import('./home/export-import/export-import-routing.module').then(m => m.ExportImportRoutingModule)
  },
  { path: 'company', component: CompanyComponent, canActivate:[AuthGuard]},
  { path: 'notification', component: NotificationComponent, canActivate:[AuthGuard]},
  { path: 'inquiry', component: InquiryComponent, canActivate:[AuthGuard]},
  { path: 'msdc-inquiry', component: MsdcInquiryComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'requests', pathMatch: 'full'},
  // { path: '**', redirectTo: 'export-import', pathMatch: 'full'},


  
  
  // { path: '', redirectTo: 'requests/pending-requests', pathMatch: 'full'},
  // { path: 'requests', redirectTo: 'requests/pending-requests', pathMatch: 'full'},
  // { path: 'login', component: LoginComponent},
  // { path: 'requests', component: RequestComponent,
  //   children: [
    //     {path: 'pending-requests', component: PendingRequestComponent},
    //     {path: 'completed-requests', component: CompletedRequestComponent},
    //     {path: 'new-request', component: NewRequestComponent},
    //     {path: 'items-component', component: ItemsComponent},
    //   ]
    // },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  