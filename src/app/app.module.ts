import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbActionsModule, NbUserModule, NbIconModule, NbThemeModule, NbContextMenuModule,NbCardModule, NbMenuModule, NbSidebarModule, NbLayoutModule, NbToastrModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {CommonModule} from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppPagesModule } from './pages/pages.module';
import { AppAuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import { ToasterService} from "./service/toastr.service";
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './service/auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbLayoutModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    ThemeModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    NgxImageZoomModule,
    ToastrModule.forRoot(),
    AppPagesModule,
    AppAuthModule,
    HttpClientModule,

    // dois etres le dernier sur la
    AppRoutingModule,
  ],
  providers: [
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
