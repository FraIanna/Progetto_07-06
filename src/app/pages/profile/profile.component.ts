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
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.loadFavoriteMovies(user.id);
      }
    });
    this.movieSvc.getAll().subscribe((movies) => {
      this.movies = movies;
    });
  }

  loadFavoriteMovies(userId: number) {
    this.favoriteMovieSvc.getFavoriteByUserId(userId).subscribe((favorites) => {
      this.favoriteMovies = favorites;
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
