import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import * as fromModules from './modules';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainRoutingModule, ...fromModules.modules],
})
export class MainModule {}
