import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [],
    imports: [FormsModule, CommonModule,
        RouterModule.forChild([
        { path: '', component: LoginComponent }
    ])
    ]
})

export class LoginModule {}