import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';
import { AuthGuard } from '../auth-guard.service';
import { FirmaComponent } from './firma/firma.component';
import { SettingComponent } from './setting/setting.component';
import { BestellenComponent } from './bestellen/bestellen.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {
    path: 'products', component: PagesComponent,
    children: [
      {
        path: 'shopping', 
        component: WarenkorbComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'favorite', 
        component: FavoriteComponent,
      },
      {
        path: 'order', 
        component: BestellenComponent,
      },
      {
        path: '', component: ProductsComponent,
      },
      {
        path: ':id', component: ProductDetailComponent,  pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home', component: PagesComponent,
    children: [
      {
        path: 'shop', component: FirmaComponent,
      },
      {
        path: 'setting', component: SettingComponent, canActivate: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { /*https://www.techiediaries.com/routing-angular-router/ */ }
