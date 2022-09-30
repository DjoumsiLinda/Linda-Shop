import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NbLayoutModule, NbOptionModule, NbSearchModule, NbAlertModule,NbCheckboxModule,NbInputModule ,
  NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbListModule,
  NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';
import { FirmaComponent } from './firma/firma.component';
import { SettingComponent } from './setting/setting.component';
import { BestellenComponent } from './bestellen/bestellen.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [
    PagesComponent,
    PageNotFoundComponent,
    ProductsComponent,
    ProductDetailComponent,
    WarenkorbComponent,
    FirmaComponent,
    SettingComponent,
    BestellenComponent,
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
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
    RouterModule,
    PagesRoutingModule,
    NgxImageZoomModule,
    ReactiveFormsModule,
  ],
})
export class AppPagesModule {}
