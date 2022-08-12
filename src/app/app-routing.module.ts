import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {LoginComponent} from "./auth/login/login.component";


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AppAuthModule),
  },
  { path: '',  redirectTo: 'pages', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
