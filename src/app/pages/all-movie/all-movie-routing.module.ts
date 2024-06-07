import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMovieComponent } from './all-movie.component';

const routes: Routes = [{ path: '', component: AllMovieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMovieRoutingModule { }
