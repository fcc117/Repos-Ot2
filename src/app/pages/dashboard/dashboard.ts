import { Component, signal } from '@angular/core';
import { Statswidget } from './components/statswidget/statswidget';
import { ITotalesTicket } from './interfaces/ITotalesTicket';
import { AuthService } from '../../core/services/login/auth-service';
import { Ticketservice } from '../../core/services/ticket/ticketservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Statswidget, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  totales = signal<ITotalesTicket[]>([]);
  isLoading = signal(true);
  constructor(private authService: AuthService, private ticketService: Ticketservice) {
    this.cargaTotales();
  }

  cargaTotales() {
    const fcNumeroEmpleado = this.authService.getCurrentUser()?.fnNumeroEmpleado?.toString() ?? '';

    this.ticketService.obtenerTotalesTicket(fcNumeroEmpleado).subscribe({
      next: (response) => {
        if (response.exito) {
          this.totales.set(response.datalist);
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Error al obtener totales:', err);
        this.totales.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
