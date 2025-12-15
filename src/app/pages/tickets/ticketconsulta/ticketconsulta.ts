import { Component, computed, signal } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';
import { ICatalogo } from '../interfaces/ICatalogo';
import { ICatalogoItem } from '../interfaces/ICatalogoItem';
import { PrimeNG } from 'primeng/config';
import {
  obtenerAntiguedad,
  obtenerAntiguedadAsignacion,
  obtenerUsrLogueado,
  setSpanishLocale,
} from '../../../core/helpers/utils.helper';
import { Ticketservice } from '../../../core/services/ticket/ticketservice';
import { IEntTickets, ITicketsRequest } from '../interfaces/IEntTicketParam';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticketconsulta',
  imports: [PrimeImportsModule],
  templateUrl: './ticketconsulta.html',
  styleUrl: './ticketconsulta.css',
  providers: [ConfirmationService],
})
export class Ticketconsulta {
  constructor(
    private primengConfig: PrimeNG,
    private ticketService: Ticketservice,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit() {
    setSpanishLocale(this.primengConfig);
    const fcNumeroEmpleado = obtenerUsrLogueado().fnNumeroEmpleado?.toString() ?? '';
    this.catalogoVerTickets(fcNumeroEmpleado);
    this.catalogoEstatus();
    this.catalogoArea();
    this.catalogoAntiguedad();
  }

  SelectedFolioValue = signal<number | null>(null);
  SelectedSolicitanteValue = signal<string>('');
  selectedVerTicketsValue = signal<ICatalogoItem | null>(null);
  selectedEstatusValue = signal<ICatalogoItem | null>(null);
  selectedAreaValue = signal<ICatalogoItem | null>(null);
  selectedRangoAntiguedadValue = signal<ICatalogoItem | null>(null);
  selectedAntiguedadValue = signal<number | null>(null);
  selectedFechaRegistroValue = signal<Date[] | undefined>(undefined);
  selectedFechaCierreValue = signal<Date[] | undefined>(undefined);
  totalTickets = signal<number | null>(0);

  arrVerTickets = signal<ICatalogo[]>([]);
  arrEstatus = signal<ICatalogo[]>([]);
  arrArea = signal<ICatalogo[]>([]);
  arrAntiguedad = signal<ICatalogo[]>([]);
  arrTickets = signal<IEntTickets[]>([]);

  readonly opcionesVerTickets = computed(() =>
    this.arrVerTickets().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesEstatus = computed(() =>
    this.arrEstatus().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesArea = computed(() =>
    this.arrArea().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesRangoAntiguedad = computed(() =>
    this.arrAntiguedad().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  private catalogoVerTickets(fcNumeroEmpleado: string): void {
    this.ticketService.obtenerVerTickets(fcNumeroEmpleado).subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrVerTickets.set(response.datalist);
          const primerElemento = this.arrVerTickets()[0] ?? null;
          const defaultSelection: ICatalogoItem = {
            name: primerElemento.valor,
            code: primerElemento.id,
          };

          this.selectedVerTicketsValue.set(defaultSelection);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrVerTickets.set([]);
      },
    });
  }

  private catalogoEstatus(): void {
    this.ticketService.ObtenerEstatus().subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrEstatus.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrEstatus.set([]);
      },
    });
  }

  private catalogoArea(): void {
    this.ticketService.obtenerAreaServicio().subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrArea.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrArea.set([]);
      },
    });
  }

  private catalogoAntiguedad(): void {
    this.ticketService.obtenerAntiguedad().subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrAntiguedad.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrAntiguedad.set([]);
      },
    });
  }

  private consultaTickets(): void {
    const obj: ITicketsRequest = {
      model: {
        usuarioLlaveMaestra: obtenerUsrLogueado().fnNumeroEmpleado?.toString() ?? '',
        folioTicket: Number(this.SelectedFolioValue()) || -1,
        auditorSolicitante: this.SelectedSolicitanteValue() ?? '',
        antiguedadRango:
          this.selectedRangoAntiguedadValue()?.code === 1
            ? '<'
            : this.selectedRangoAntiguedadValue()?.code === 2
            ? '='
            : this.selectedRangoAntiguedadValue()?.code === 3
            ? '>'
            : '',
        antiguedad: this.selectedAntiguedadValue() ?? -1,
        fechaRegistroDesde: this.selectedFechaRegistroValue()?.[0] ?? null,
        fechaRegistroHasta: this.selectedFechaRegistroValue()?.[1] ?? null,
        idEstatus: this.selectedEstatusValue()?.code ?? -1,
        fechaCierreDesde: this.selectedFechaCierreValue()?.[0] ?? null,
        fechaCierreHasta: this.selectedFechaCierreValue()?.[1] ?? null,
        idVerRegistros: this.selectedVerTicketsValue()?.code ?? -1,
        idArea: this.selectedAreaValue()?.code ?? -1,
      },
    };

    this.ticketService.obtenerTickets(obj).subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrTickets.set(response.datalist);
          const columnasCalculadas = this.calcularColumnasTickets(response.datalist);

          this.arrTickets.set(columnasCalculadas);
          this.totalTickets.set(this.arrTickets().length ?? 0);
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
        console.error('Error al obtener el listado de tickets:', err);
        this.arrTickets.set([]);
      },
    });
  }
  onConsultaTickets(): void {
    this.consultaTickets();
  }
  public calcularAntiguedad(fechaAlta: Date): string {
    return obtenerAntiguedad(fechaAlta);
  }
  public calcularAntiguedadAsignacion(
    fechaAsignacion: Date | string | null,
    fechaCierre: Date | string | null
  ): string {
    return fechaAsignacion ? obtenerAntiguedadAsignacion(fechaAsignacion, fechaCierre) : '-';
  }

  public obtenerEstatusColor(idEstatus: number): string {
    switch (idEstatus) {
      case 1:
        return 'pi pi-ticket text-amber-600 !text-2xl';
      case 2:
        return 'pi pi-ticket text-green-600 !text-2xl';
      case 3:
        return 'pi pi-ticket text-gray-600 !text-2xl';
      case 4:
        return 'pi pi-ticket text-red-600 !text-2xl';
      default:
        return 'pi pi-ticket text-shadow-600 !text-2xl';
    }
  }

  public generaTipoSolicitud(ticket: IEntTickets): string {
    const partes: string[] = [];

    if (ticket.areas) partes.push(`${ticket.areas}`);
    if (ticket.tipo_requerimiento) partes.push(`${ticket.tipo_requerimiento}`);
    if (ticket.unidad_negocio) partes.push(`${ticket.unidad_negocio}`);
    if (ticket.referente_a) partes.push(`${ticket.referente_a}`);
    if (ticket.usuario_creacion)
      partes.push(
        `<br>Solicitó: <span class="text-shadow-black font-bold">${ticket.usuario_creacion}</span>`
      );

    return partes.join(' / ');
  }
  public limpiarCampos(): void {
    const primerElemento = this.arrVerTickets()[0] ?? null;
    const defaultSelection: ICatalogoItem = {
      name: primerElemento.valor,
      code: primerElemento.id,
    };

    this.SelectedFolioValue.set(null);
    this.SelectedSolicitanteValue.set('');
    this.selectedVerTicketsValue.set(defaultSelection);
    this.selectedEstatusValue.set(null);
    this.selectedAreaValue.set(null);
    this.selectedRangoAntiguedadValue.set(null);
    this.selectedAntiguedadValue.set(null);
    this.selectedFechaRegistroValue.set(undefined);
    this.selectedFechaCierreValue.set(undefined);
    this.totalTickets.set(0);

    this.arrTickets.set([]);
  }

  calcularColumnasTickets(tickets: IEntTickets[]): IEntTickets[] {
    if (!tickets || tickets.length === 0) {
      return [];
    }

    return tickets.map((ticket) => {
      return {
        ...ticket,

        antiguedad_calculada: this.calcularAntiguedad(ticket.fecha_alta),
        asignacion_calculada: this.calcularAntiguedadAsignacion(
          ticket.fecha_asignacion,
          ticket.fecha_cierre
        ),
        solicitud_calculada: this.generaTipoSolicitud(ticket),
      };
    });
  }

  irDetalle(folio: number): void {
    this.router.navigate(['/tickets', 'detalle', folio]);
  }
}
