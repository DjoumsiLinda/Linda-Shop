import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule,
  NbSpinnerModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbOptionModule, NbSearchModule, NbListModule, NbSelectModule
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbDialogModule,
    NbLayoutModule,
    NbOptionModule,
    NbSearchModule,
    NbListModule,
    NbSelectModule,
  ],
})
export class AppAuthModule {}
