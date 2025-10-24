import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseData } from '../interfaces/IResponseData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpclient: HttpClient, private router: Router) {}

  private baseUrl = 'http://localhost:8000/ApiGateway';

  login(UserName: string, Password: string): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${this.baseUrl}/Login/InicioSesion`, {
      UserName,
      Password,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setToken(token: string, expire: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('expire', expire.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const expire = parseInt(localStorage.getItem('expire') || '0', 10);
    const now = Math.floor(Date.now() / 1000);
    return expire <= now;
  }
}
