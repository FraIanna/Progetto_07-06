import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iMovie } from '../Models/i-movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiMovieUrl = 'http://localhost:3000/movies-popular';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iMovie[]>(this.apiMovieUrl);
  }

  getById(id: number) {
    return this.http.get<iMovie>(`${this.apiMovieUrl}/${id}`);
  }

  create(newMovie: Partial<iMovie>) {
    return this.http.post<iMovie>(this.apiMovieUrl, newMovie);
  }

  update(movie: iMovie) {
    return this.http.put<iMovie>(`${this.apiMovieUrl}/${movie.id}`, movie);
  }

  delete(id: number) {
    return this.http.delete<iMovie>(`${this.apiMovieUrl}/${id}`);
  }
}
