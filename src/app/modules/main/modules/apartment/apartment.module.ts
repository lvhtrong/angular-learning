import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromPages from './pages';

@NgModule({
  declarations: [...fromPages.pages],
  imports: [CommonModule],
})
export class ApartmentModule {}
