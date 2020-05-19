import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromModules from './modules';
import { AuthGuard } from '@core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'apartments',
      },
      ...fromModules.routes,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
