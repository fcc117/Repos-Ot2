import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/login/auth-service';
import { _config } from '../../../../config';
import { IUserData } from '../../../core/interfaces/IUserData';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sesionexistente',
  imports: [PrimeImportsModule, RouterModule],
  providers: [MessageService],
  templateUrl: './sesionexistente.html',
  styleUrl: './sesionexistente.css',
})
export class Sesionexistente {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  url = 'https://google.com.mx';
  fcNumeroEmpleado = localStorage.getItem('fcNumeroEmpleado') ?? '';
  onRedireccionar() {
    window.location.href = this.url;
  }

  onCerrarSesionExistente() {
    this.authservice
      .logoutsesionexistente(this.fcNumeroEmpleado, _config.cierresesionexistente, 2)
      .subscribe({
        next: (response) => {
          if (response.exito) {
            this.authservice.loginsesionexistente(this.fcNumeroEmpleado, '').subscribe({
              next: (response) => {
                if (response.exito) {
                  const userData: IUserData = {
                    fnNumeroEmpleado: response.data.fnNumeroEmpleado, // Asumiendo que vienen en response.data
                    fcNombre: response.data.fcNombre,
                    fcPuesto: response.data.fcPuesto,
                    menu: response.objectlist,
                  };

                  const segundos = this.convertMinToSeg(response.expireIn);
                  this.authservice.setToken(response.accessToken, segundos);
                  this.authservice.setUserData(userData);
                  this.router.navigate(['/inicio'], { replaceUrl: true });
                } else {
                  if (response.codeError === '2') {
                    this.router.navigate(['perfilnoautorizado'], { replaceUrl: true });
                  } else if (response.codeError === '3') {
                    this.router.navigate(['sinacceso'], { replaceUrl: true });
                  }
                }
              },
              error: (err) => {
                console.error('Error HTTP:', err);

                if (err.error.codeError === '4') {
                  this.router.navigate(['error'], { replaceUrl: true });
                }
              },
            });
          } else {
            this.showError(response.error);
          }
        },
      });
  }

  showError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
      life: 4000,
    });
  }

  convertMinToSeg(minutos: number) {
    const now = Math.floor(Date.now() / 1000);
    const expireInSeconds = minutos * 10 * 60;
    return now + expireInSeconds;
  }
}
