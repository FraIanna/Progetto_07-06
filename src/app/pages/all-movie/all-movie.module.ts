import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllMovieRoutingModule } from './all-movie-routing.module';
import { AllMovieComponent } from './all-movie.component';


@NgModule({
  declarations: [
    AllMovieComponent
  ],
  imports: [
    CommonModule,
    AllMovieRoutingModule
  ]
})
export class AllMovieModule { }
