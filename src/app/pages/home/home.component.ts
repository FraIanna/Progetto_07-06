import { iMovie } from '../../Models/i-movie';
import { AuthService } from '../../auth/auth.service';
import { MovieService } from './../../Services/movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movies: iMovie[] = [];
  isLoggedIn: boolean = false;

  constructor(private movieSvc: MovieService, private authSvc: AuthService) {}

  ngOnInit() {
    this.movieSvc.getAll().subscribe((movies) => {
      this.movies = movies.filter((movie) => movie.genre === 'Action');
    });
    this.authSvc.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }
}
