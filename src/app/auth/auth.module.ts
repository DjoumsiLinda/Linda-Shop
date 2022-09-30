import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbOptionModule, NbSearchModule, NbListModule, NbSelectModule, NbSidebarModule
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {LogoutComponent} from "./logout/logout.component";
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../auth-guard.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    LogoutComponent
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
    NbSidebarModule.forRoot(),
    NbOptionModule,
    NbSearchModule,
    NbListModule,
    NbSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
})
export class AppAuthModule {}
