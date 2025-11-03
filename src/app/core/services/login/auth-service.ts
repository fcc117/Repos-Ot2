import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseData } from '../../interfaces/IResponseData';
import { Router } from '@angular/router';
import { IUserData } from '../../interfaces/IUserData';
import { obtenerNumeroEmpleado } from '../../helpers/utils.helper';
import { _config } from '../../../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpclient: HttpClient, private router: Router, private zone: NgZone) {
    this.loadUserDataFromStorage();
  }

  private userDataSource = new BehaviorSubject<IUserData | null>(null);
  public userData$ = this.userDataSource.asObservable();

  login(UserName: string, Password: string): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Login/InicioSesion`, {
      UserName,
      Password,
    });
  }
  loginsesionexistente(UserName: string, Password: string): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Login/InicioSesionExistente`, {
      UserName,
      Password,
    });
  }
  logout(fcNumeroEmpleado: string, fcTipoAcceso: string, fnTipoCierre: number) {
    return this._httpclient
      .post<IResponseData>(`${_config.baseUrl}/Login/CierreSesion`, {
        fcNumeroEmpleado,
        fcTipoAcceso,
        fnTipoCierre,
      })
      .subscribe({
        next: (response) => {
          if (response.exito) {
            this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
              localStorage.removeItem('token');
              localStorage.removeItem('expire');
              localStorage.removeItem('user_data');
              this.userDataSource.next(null);
            });
          } else {
            this.router.navigate(['/error'], { replaceUrl: true });
          }
        },
        error: (err) => {
          console.error('[Logout] Error al cerrar sesión:', err);
        },
      });
  }

  logoutsesionexistente(fcNumeroEmpleado: string, fcTipoAcceso: string, fnTipoCierre: number) {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Login/CierreSesion`, {
      fcNumeroEmpleado,
      fcTipoAcceso,
      fnTipoCierre,
    });
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

  setUserData(data: IUserData) {
    this.userDataSource.next(data);
    localStorage.setItem('user_data', JSON.stringify(data));
  }

  getCurrentUser(): IUserData | null {
    return this.userDataSource.getValue();
  }

  private loadUserDataFromStorage() {
    const storedData = localStorage.getItem('user_data');
    const fcNumeroEmpleado = obtenerNumeroEmpleado();
    if (storedData && this.isAuthenticated()) {
      try {
        this.userDataSource.next(JSON.parse(storedData));
      } catch (e) {
        console.error('Error al cargar datos de usuario', e);
        this.logout(fcNumeroEmpleado, _config.cierreSesion, 1);
      }
    }
  }
}
