import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbRoleProvider, NbAccessChecker, NbAclService, NbSecurityModule } from '@nebular/security';
import { NbActionsModule, NbUserModule, NbIconModule, NbThemeModule, NbContextMenuModule,NbCardModule,
  NbMenuModule, NbSidebarModule,NbSelectModule, NbLayoutModule,NbPopoverModule,NbDatepickerModule,NbSpinnerModule, NbDialogModule, NbWindowModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { ThemeModule } from './@theme/theme.module';
import { AuthGuard } from './auth-guard.service';
import { AUTH_STRATEGY } from './shared/constants/constants.ts';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { RoleProvider } from './auth/provider/role.provider';
import { AccessChecker } from './auth/services/access-checker.service';
import { AppComponent } from './app.component';
import { AppPagesModule } from './pages/pages.module';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    NbEvaIconsModule,
    NbSecurityModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    NbPopoverModule,
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: AUTH_STRATEGY,
          token: {
            class: NbAuthJWTToken,
            key: 'key',
          },
          baseEndpoint: '/auth',
          login: {
            endpoint: '/security/token/',
            method: 'post',
            defaultErrors: ['Benutzername oder Passwort inkorrekt.'],
            defaultMessages: ['Erfolgreich angemeldet.'],
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
          logout: {
            endpoint: '',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
            defaultErrors: ['Abmeldung nicht erfolgreich.'],
            defaultMessages: ['Erfolgreich abgemeldet.'],
          }
        }),
      ],
      forms: {
        login: formSetting,
        logout: formSetting,
      },
    }),
  ],
  providers: [AuthGuard,
    { provide: NbRoleProvider, useClass: RoleProvider },
    { provide: NbAccessChecker, useClass: AccessChecker },
    { provide: NbAclService},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
