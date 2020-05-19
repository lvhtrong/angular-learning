import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as fromServices from './services';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [],
  providers: [...fromServices.services],
})
export class CoreModule {}
