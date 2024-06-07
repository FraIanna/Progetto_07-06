import { Component } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { iMovie } from '../../Models/i-movie';
import { iFavoriteMovie } from '../../Models/i-favorite-movie';
import { FavoriteMovieService } from '../../Services/favorite-movie.service';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  movies: iMovie[] = [];
  favoriteMovies: iFavoriteMovie[] = [];
  user!: iUser;

  constructor(
    private movieSvc: MovieService,
    private authSvc: AuthService,
    private favoriteMovieSvc: FavoriteMovieService
  ) {}

  ngOnInit() {
    this.movieSvc.getAll().subscribe((movies) => {
      this.movies = movies;

      this.favoriteMovieSvc.getAll().subscribe((favoriteMovies) => {
        this.favoriteMovies = favoriteMovies;
      });
    });
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  deleteMovie(id: number) {
    this.favoriteMovieSvc.delete(id).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(
        (movie) => movie.id !== id
      );
    });
  }
}
