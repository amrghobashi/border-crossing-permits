import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from 'src/app/shared/can-deactivate.guard';
import { AuthGuard } from "../../login/auth.guard";
import { ExportImportComponent } from './export-import.component';
import { ExportComponent } from './export/export.component';
import { ImportUserComponent } from './import-user/import-user.component';
import { ImportComponent } from './import/import.component';


const requestRoutes: Routes = [
    // { path: '', redirectTo: 'requests', pathMatch: 'full'},
    // { path: 'requests', redirectTo: 'requests/pending-requests', pathMatch: 'full'},
    { path: '', component: ExportImportComponent, canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        children: [
        {path: '', redirectTo: 'export', pathMatch: 'full'},
        {path: 'export', component: ExportComponent, canDeactivate: [CanDeactivateGuard]},
        {path: 'import', component: ImportComponent},
        {path: 'import-user', component: ImportUserComponent},
        ]
    },
    // { path: '', redirectTo: 'export', pathMatch: 'full'},
    { path: '**', redirectTo: 'export', pathMatch: 'full'},
  ];

  @NgModule({
    imports: [RouterModule.forChild(requestRoutes)],
    exports: [RouterModule]
  })

  export class ExportImportRoutingModule {}