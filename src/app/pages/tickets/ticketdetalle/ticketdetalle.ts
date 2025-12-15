import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeImportsModule } from '../../../primeng-imports';
import { Ticketservice } from '../../../core/services/ticket/ticketservice';
import { IEntDetalleTicket } from '../interfaces/IEntDetalleTicket';
import { ConfirmationService } from 'primeng/api';
import { obtenerRolesUsuarios, toNumeroSafe } from '../../../core/helpers/utils.helper';

@Component({
  selector: 'app-ticketdetalle',
  imports: [PrimeImportsModule],
  templateUrl: './ticketdetalle.html',
  styleUrl: './ticketdetalle.css',
  providers: [ConfirmationService],
})
export class Ticketdetalle {
  constructor(
    private route: ActivatedRoute,
    private ticketService: Ticketservice,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.consultarDetalle();
    this.arrRoles.set(obtenerRolesUsuarios());
  }

  detalleTicket = signal<IEntDetalleTicket | null>(null);
  arrRoles = signal<number[]>([]);

  private consultarDetalle(): void {
    const folio = toNumeroSafe(this.route.snapshot.paramMap.get('id'));
    this.obtenerDetalleTicket(folio);
  }

  private obtenerDetalleTicket(folio: number): void {
    this.ticketService.obtenerDetalleTicket(folio).subscribe({
      next: (response) => {
        if (response.exito) {
          this.detalleTicket.set(response.data);
        } else {
          this.confirmationService.confirm({
            header: 'Error:',
            message: 'Ocurrió un error al consultar la información.',
            icon: 'pi pi-times-circle',
            acceptVisible: true,
            rejectVisible: false,
            acceptLabel: 'Aceptar',
          });
        }
      },
      error: (err) => {
        this.confirmationService.confirm({
          header: 'Error:',
          message: 'Ocurrió un error, favor de contactar a su administrador.',
          icon: 'pi pi-times-circle',
          acceptVisible: true,
          rejectVisible: false,
          acceptLabel: 'Aceptar',
        });
        console.error('Error al obtener el detalle del ticket:', err);
        this.detalleTicket.set(null);
      },
    });
  }
  mostrarPrioridad(): boolean {
    return (
      this.detalleTicket()?.id_estatus !== 3 && this.arrRoles().some((r) => [2, 3, 5].includes(r))
    );
  }
}
