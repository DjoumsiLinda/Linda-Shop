import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';

const routes: Routes = [
  {
    path: 'products', component: PagesComponent,
    children: [
      {
        path: '', component: ProductsComponent,
      },
      {
        path: 'navigation', component: NavigationComponent,
      },
      {
        path: 'warenkorb', component: WarenkorbComponent,
      },
      {
        path: ':id', component: ProductDetailComponent,  pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { /*https://www.techiediaries.com/routing-angular-router/ */ }
