import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestComponent } from './home/request/request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ToolBarComponent } from './shared/tool-bar/tool-bar.component';
import { CompletedRequestComponent } from './home/request/completed-request/completed-request.component';
import { NewRequestComponent } from './home/request/new-request/new-request.component';
import { PendingRequestComponent } from './home/request/pending-request/pending-request.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RequestDetailComponent } from './home/request/request-detail/request-detail.component';
import { ItemsComponent } from './home/request/items/items.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderInterceptor } from './shared/header-interceptor';
import { ConfirmMessageComponent } from './shared/confirm-message/confirm-message.component';
import { AddItemComponent } from './home/request/new-request/add-item/add-item.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AddExtraItemComponent } from './home/request/new-request/add-extra-item/add-extra-item.component';
import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ExportImportComponent } from './home/export-import/export-import.component';
import { ExportComponent } from './home/export-import/export/export.component';
import { ImportComponent } from './home/export-import/import/import.component';
import { ImportUserComponent } from './home/export-import/import-user/import-user.component';
import { CanDeactivateGuard } from './shared/can-deactivate.guard';
import { ExcelUploaderComponent } from './shared/excel-uploader/excel-uploader.component';
import { CompanyComponent } from './home/company/company.component';
import { NotificationComponent } from './home/notification/notification.component';
import { InquiryComponent } from './home/inquiry/inquiry.component';
import { MsdcInquiryComponent } from './home/msdc-inquiry/msdc-inquiry.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MarqueeComponent } from './shared/marquee/marquee.component';
// import { saveAs } from 'file-saver';


@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    ToolBarComponent,
    CompletedRequestComponent,
    NewRequestComponent,
    PendingRequestComponent,
    RequestDetailComponent,
    ItemsComponent,
    ConfirmMessageComponent,
    AddItemComponent,
    DialogComponent,
    AddExtraItemComponent,
    LoginComponent,
    // HomeComponent,
    FileUploaderComponent,
    SidenavComponent,
    ExportImportComponent,
    ExportComponent,
    ImportComponent,
    ImportUserComponent,
    ExcelUploaderComponent,
    CompanyComponent,
    NotificationComponent,
    InquiryComponent,
    MsdcInquiryComponent,
    FooterComponent,
    MarqueeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,
    MatProgressBarModule,
    MatStepperModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgxMatSelectSearchModule,
    MatDialogModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
