import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iUser } from '../Models/i-user';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { iAuthResponse } from '../Models/i-auth-response';
import { iAuthData } from '../Models/i-auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<null | iUser>(null);
  user$ = this.authSubject.asObservable();

  usersSubject = new BehaviorSubject<iUser[]>([]);
  users$ = this.usersSubject.asObservable();

  syncIsLoggedIn: boolean = false;
  isLoggedIn$ = this.user$.pipe(
    map((user) => !!user),
    tap((user) => (this.syncIsLoggedIn = user))
  );

  loginUrl: string = 'http://localhost:3000/login';
  registerUrl: string = 'http://localhost:3000/register';
  usersUrl: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private router: Router) {}

  register(newUser: Partial<iUser>): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
  }

  login(authData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, authData).pipe(
      tap((data) => {
        this.authSubject.next(data.user);
        localStorage.setItem('accessData', JSON.stringify(data));
        this.autoLogout();
      })
    );
  }
  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/home']);
  }

  autoLogout(): void {
    const accessData = this.getAccessData();
    if (!accessData) return;
    const expDate = this.jwtHelper.getTokenExpirationDate(
      accessData.accessToken
    ) as Date;
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(this.logout, expMs);
  }

  getAccessData(): iAuthResponse | null {
    const accessDataJson = localStorage.getItem('accessData');
    if (!accessDataJson) return null;
    const accessData: iAuthResponse = JSON.parse(accessDataJson);
    return accessData;
  }

  restoreUser(): void {
    const accessData = this.getAccessData();
    if (!accessData) return;
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;
    this.authSubject.next(accessData.user);
    this.autoLogout();
  }

  loadAllUsers(): void {
    this.http.get<iUser[]>(this.usersUrl).subscribe((users) => {
      this.usersSubject.next(users);
    });
  }
}
