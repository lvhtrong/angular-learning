import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromServices from './services';

@NgModule({
  declarations: [...fromServices.services],
  imports: [CommonModule],
  exports: [...fromServices.services],
})
export class CoreModule {}
