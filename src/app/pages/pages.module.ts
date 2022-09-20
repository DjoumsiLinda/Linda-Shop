import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NbLayoutModule, NbOptionModule, NbSearchModule, NbAlertModule,NbCheckboxModule,NbInputModule ,
  NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbListModule,
  NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';

@NgModule({
  declarations: [
    PagesComponent,
    NavigationComponent,
    PageNotFoundComponent,
    ProductComponent,
    ProductListComponent,
    ProductsComponent,
    ProductDetailComponent,
    WarenkorbComponent
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
  ],
})
export class AppPagesModule {}
