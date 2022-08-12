import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbActionsModule, NbUserModule, NbIconModule, NbThemeModule, NbContextMenuModule,NbCardModule, NbMenuModule, NbSidebarModule, NbLayoutModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppPagesModule } from './pages/pages.module';
import { AppAuthModule} from "./auth/auth.module";

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
    AppAuthModule,

    // dois etres le dernier sur la
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
