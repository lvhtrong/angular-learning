import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import * as fromPages from './pages';

@NgModule({
  declarations: [...fromPages.pages],
  imports: [CommonModule, ApartmentRoutingModule],
})
export class ApartmentModule {}
