import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  {
    path: 'pages', component: PagesComponent,
    children: [
        {
           path: 'navigation', component: NavigationComponent,
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
