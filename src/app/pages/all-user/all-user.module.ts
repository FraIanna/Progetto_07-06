import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllUserRoutingModule } from './all-user-routing.module';
import { AllUserComponent } from './all-user.component';


@NgModule({
  declarations: [
    AllUserComponent
  ],
  imports: [
    CommonModule,
    AllUserRoutingModule
  ]
})
export class AllUserModule { }
