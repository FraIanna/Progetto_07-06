import { Component } from '@angular/core';
import { iMovie } from '../../Models/i-movie';
import { MovieService } from '../../Services/movie.service';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';
import { iFavoriteMovie } from '../../Models/i-favorite-movie';
import { FavoriteMovieService } from '../../Services/favorite-movie.service';

@Component({
  selector: 'app-all-movie',
  templateUrl: './all-movie.component.html',
  styleUrl: './all-movie.component.scss',
})
export class AllMovieComponent {
  movies: iMovie[] = [];
  user!: iUser;

  constructor(
    private movieSvc: MovieService,
    private authSvc: AuthService,
    private favoriteMovieSvc: FavoriteMovieService
  ) {}

  ngOnInit() {
    this.movieSvc.getAll().subscribe((movie) => {
      this.movies = movie;
    });
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }
  addToFavorite(id: number) {
    this.movieSvc.getById(id).subscribe((movie) => {
      if (this.user && movie) {
        const favoriteMovie: Partial<iFavoriteMovie> = {
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          time: movie.time,
          image: movie.image,
          id: movie.id,
          userId: this.user.id,
        };
        this.favoriteMovieSvc.create(favoriteMovie).subscribe(() => {
          console.log(
            `${movie.title} added to favorites for user ${this.user.id}`
          );
        });
      }
    });
  }
}
