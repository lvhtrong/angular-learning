import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonAuthGuard } from '@core/guards/non-auth/non-auth.guard';

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NonAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
