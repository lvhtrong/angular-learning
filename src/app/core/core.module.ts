import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

import * as fromServices from './services';
import * as fromDomains from './domains';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [],
  providers: [...fromServices.services, ...fromDomains.services],
})
export class CoreModule {}
