import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFavoriteMovie } from '../Models/i-favorite-movie';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMovieService {
  apiFavoriteMovieUrl = '  http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iFavoriteMovie[]>(this.apiFavoriteMovieUrl);
  }

  getById(id: number) {
    return this.http.get<iFavoriteMovie>(`${this.apiFavoriteMovieUrl}/${id}`);
  }

  getFavoriteByUserId(userId: number) {
    return this.http.get<iFavoriteMovie[]>(
      `${this.apiFavoriteMovieUrl}?userId=${userId}`
    );
  }

  create(newMovie: Partial<iFavoriteMovie>) {
    return this.http.post<iFavoriteMovie>(this.apiFavoriteMovieUrl, newMovie);
  }

  delete(id: number) {
    return this.http.delete<iFavoriteMovie>(
      `${this.apiFavoriteMovieUrl}/${id}`
    );
  }
}
