import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbRoleProvider, NbAccessChecker, NbAclService, NbSecurityModule } from '@nebular/security';
import { NbActionsModule, NbUserModule, NbIconModule, NbThemeModule, NbContextMenuModule,NbCardModule,
  NbMenuModule, NbSidebarModule, NbLayoutModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {  NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { ThemeModule } from './@theme/theme.module';
import { AuthGuard } from './auth-guard.service';
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
    NbActionsModule,
    NbUserModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    ThemeModule.forRoot(),
    NbLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppPagesModule,
    AppRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'content',
          },
          baseEndpoint: '/auth/',
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
  providers: [
    { provide: NbRoleProvider, useClass: RoleProvider },
    { provide: NbAccessChecker, useClass: AccessChecker },
    { provide: NbAclService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
