import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import * as fromPages from './pages';

@NgModule({
  declarations: [...fromPages.pages],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
