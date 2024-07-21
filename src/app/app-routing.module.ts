import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';
import { CompanyComponent } from './home/company/company.component';
import { NotificationComponent } from './home/notification/notification.component';
import { InquiryComponent } from './home/inquiry/inquiry.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./home/request/request-routing.module').then(m => m.RequestRoutingModule)
  },
  {
    path: 'export-import',
    loadChildren: () => import('./home/export-import/export-import-routing.module')
    .then(m => m.ExportImportRoutingModule)
  },
  { path: 'company', component: CompanyComponent, canActivate:[AuthGuard]},
  { path: 'notification', component: NotificationComponent, canActivate:[AuthGuard]},
  { path: 'inquiry', component: InquiryComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'requests', pathMatch: 'full'},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  