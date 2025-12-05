import { Component, computed, signal } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICatalogo } from '../interfaces/ICatalogo';
import { Ticketservice } from '../../../core/services/ticket/ticketservice';
import { ICatalogoItem, ICatalogoItemStr } from '../interfaces/ICatalogoItem';
import { _config } from '../../../../config';
import { ICatalogoAuditor } from '../interfaces/ICatalogoAuditor';
import { PrimeNG } from 'primeng/config';
import {
  convertFileToBase64,
  formatoTamanio,
  NavigationHelperService,
  obtenerUsrLogueado,
  validarCamposRequeridos,
} from '../../../core/helpers/utils.helper';
import { IEntArchivo, ITicketRequest } from '../interfaces/IEntTicket';
import { FileSelectEvent } from 'primeng/fileupload';
@Component({
  selector: 'app-ticketnuevo',
  imports: [PrimeImportsModule],
  templateUrl: './ticketnuevo.html',
  styleUrl: './ticketnuevo.css',
  providers: [MessageService, ConfirmationService],
})
export class Ticketnuevo {
  constructor(
    private messageService: MessageService,
    private ticketService: Ticketservice,
    private config: PrimeNG,
    private confirmationService: ConfirmationService,
    private navHelper: NavigationHelperService
  ) {}
  ngOnInit() {
    this.catalogoAreaServicio();
    this.catalogoCeco();
    this.agregarAuditorInicial();
  }
  plantilla = signal<string>('');
  arrAreaServicio = signal<ICatalogo[]>([]);
  arrTipoSolicitud = signal<ICatalogo[]>([]);
  arrUnidadNegocio = signal<ICatalogo[]>([]);
  arrRequerimiento = signal<ICatalogo[]>([]);
  arrEquipo = signal<ICatalogo[]>([]);
  arrReferente = signal<ICatalogo[]>([]);
  arrCeco = signal<ICatalogo[]>([]);
  arrAuditores = signal<ICatalogoAuditor[]>([]);

  selectedAreaServicioValue = signal<ICatalogoItem | null>(null);
  selectedSolicitudValue = signal<ICatalogoItem | null>(null);
  selectedUnidadNegocioValue = signal<ICatalogoItem | null>(null);
  selectedRequerimientoValue = signal<ICatalogoItem | null>(null);
  selectedEquipoValue = signal<ICatalogoItem | null>(null);
  selectedReferenteValue = signal<ICatalogoItem | null>(null);
  selectedCecoValue = signal<ICatalogoItem | null>(null);
  selectedAuditorValue = signal<ICatalogoItemStr[]>([]);
  selectedAuditorValueTemp = signal<ICatalogoItemStr[]>([]);
  opcionesAuditoresFiltradas = signal<ICatalogoItemStr[]>([]);

  listaDocumentos = signal<IEntArchivo[]>([]);

  readonly opcionesAreaServicio = computed(() =>
    this.arrAreaServicio().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesTipoSolicitud = computed(() =>
    this.arrTipoSolicitud().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesUnidadNegocio = computed(() =>
    this.arrUnidadNegocio().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesRequerimiento = computed(() =>
    this.arrRequerimiento().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesEquipo = computed(() =>
    this.arrEquipo().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesReferente = computed(() =>
    this.arrReferente().map((item) => ({
      code: item.id,
      name: item.valor,
    }))
  );

  readonly opcionesCeco = computed(() =>
    this.arrCeco().map((item) => ({
      code: item.id.toString(),
      name: item.valor,
    }))
  );
  readonly opcionesAuditor = computed(() =>
    this.arrAuditores().map((item) => ({
      code: item.usuario_llave_maestra,
      name: item.nombre,
    }))
  );
  readonly isTipoSolicitudDisabled = computed(() => !this.selectedAreaServicioValue());
  readonly isUnidadNegocioDisabled = computed(() => !this.selectedSolicitudValue());
  readonly isRequerimientoDisabled = computed(() => !this.selectedSolicitudValue());
  readonly isEquipoDisabled = computed(() => !this.selectedSolicitudValue());
  readonly isEquipoVisible = computed(() => {
    const selectedItem = this.selectedRequerimientoValue();
    return !!selectedItem && selectedItem.code === 1; //incidente
  });
  readonly isReferenteVisible = computed(() => {
    return this.selectedUnidadNegocioValue() !== null;
  });
  readonly isCuerpoVisible = computed(() => {
    return this.selectedReferenteValue() !== null;
  });
  private catalogoAreaServicio(): void {
    this.ticketService.obtenerAreaServicio().subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrAreaServicio.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrAreaServicio.set([]);
      },
    });
  }

  private catalogoTipoSolicitud(idArea: number): void {
    this.ticketService.obtenerTipoSolicitud(idArea).subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrTipoSolicitud.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrTipoSolicitud.set([]);
      },
    });
  }

  private catalogoUnidadNegocio(idArea: number, idSolicitud: number): void {
    this.ticketService.obtenerUnidadNegocio(idArea, idSolicitud).subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrUnidadNegocio.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrUnidadNegocio.set([]);
      },
    });
  }

  private catalogoRequerimiento(): void {
    this.ticketService.obtenerCatalogoVarios(2, 0, '').subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrRequerimiento.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrRequerimiento.set([]);
      },
    });
  }

  private catalogoEquipo(): void {
    this.ticketService.obtenerCatalogoVarios(3, 0, '').subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrEquipo.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrEquipo.set([]);
      },
    });
  }

  private catalogoReferente(
    idArea: number,
    idSolicitud: number,
    idUnidadNegocio: number,
    estatus: number
  ): void {
    this.ticketService.obtenerReferente(idArea, idSolicitud, idUnidadNegocio, estatus).subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrReferente.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrReferente.set([]);
      },
    });
  }

  private catalogoCeco(): void {
    this.ticketService.obtenerCeco().subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrCeco.set(response.datalist);
          const primerElemento = this.arrCeco()[0] ?? null;
          const defaultSelection: ICatalogoItem = {
            name: primerElemento.valor,
            code: primerElemento.id,
          };

          this.selectedCecoValue.set(defaultSelection);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrCeco.set([]);
      },
    });
  }

  private catalogoAuditores(busqueda: string): void {
    this.ticketService.obtenerAuditores(busqueda).subscribe({
      next: (response) => {
        if (response.exito) {
          this.arrAuditores.set(response.datalist);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.arrAuditores.set([]);
      },
    });
  }

  onAreaServicioChange(): void {
    const areaSeleccionada = this.selectedAreaServicioValue();

    this.selectedSolicitudValue.set(null);
    this.arrTipoSolicitud.set([]);
    this.selectedUnidadNegocioValue.set(null);
    this.arrUnidadNegocio.set([]);
    this.selectedRequerimientoValue.set(null);
    this.arrRequerimiento.set([]);
    this.selectedReferenteValue.set(null);
    this.arrReferente.set([]);
    if (!areaSeleccionada || !areaSeleccionada.code) {
      return;
    }

    const idArea = areaSeleccionada.code;
    this.catalogoTipoSolicitud(idArea);

    //limpiar adjuntos
    this.listaDocumentos.set([]);

    //limpiar auditores seleccionados
    this.selectedAuditorValue.set(this.limpiarAuditor(this.selectedAuditorValue()));
    this.selectedAuditorValueTemp.set(this.limpiarAuditor(this.selectedAuditorValueTemp()));

    //plantilla
    this.asignarPlantilla();
  }

  onTipoSolicitudChange(): void {
    const areaSeleccionada = this.selectedAreaServicioValue();
    const solicitudSeleccionada = this.selectedSolicitudValue();

    this.selectedUnidadNegocioValue.set(null);
    this.arrUnidadNegocio.set([]);
    this.selectedRequerimientoValue.set(null);
    this.arrRequerimiento.set([]);
    this.selectedReferenteValue.set(null);
    this.arrReferente.set([]);

    if (
      !areaSeleccionada ||
      !areaSeleccionada.code ||
      !solicitudSeleccionada ||
      !solicitudSeleccionada.code
    ) {
      return;
    }

    const idArea = areaSeleccionada.code;
    const idSolicitud = solicitudSeleccionada.code;
    this.catalogoUnidadNegocio(idArea, idSolicitud);
    this.catalogoRequerimiento();
  }
  onRequerimientoChange(): void {
    const requerimientoSeleccionado = this.selectedRequerimientoValue();

    this.selectedEquipoValue.set(null);
    this.arrEquipo.set([]);

    if (!requerimientoSeleccionado || !requerimientoSeleccionado.code) {
      return;
    }
    this.catalogoEquipo();
  }

  onUnidadNegocioChange(): void {
    const areaSeleccionada = this.selectedAreaServicioValue();
    const solicitudSeleccionada = this.selectedSolicitudValue();
    const UnidadNegocioSeleccionada = this.selectedUnidadNegocioValue();
    const estatus = -1;

    this.selectedReferenteValue.set(null);
    this.arrReferente.set([]);

    if (
      !areaSeleccionada ||
      !areaSeleccionada.code ||
      !solicitudSeleccionada ||
      !solicitudSeleccionada.code ||
      !UnidadNegocioSeleccionada ||
      !UnidadNegocioSeleccionada.code
    ) {
      return;
    }
    const idArea = areaSeleccionada.code;
    const idSolicitud = solicitudSeleccionada.code;
    const idUnidadNegocio = UnidadNegocioSeleccionada.code;
    this.catalogoReferente(idArea, idSolicitud, idUnidadNegocio, estatus);

    //limpiar adjuntos
    this.listaDocumentos.set([]);

    //limpiar auditores seleccionados
    this.selectedAuditorValue.set(this.limpiarAuditor(this.selectedAuditorValue()));
    this.selectedAuditorValueTemp.set(this.limpiarAuditor(this.selectedAuditorValueTemp()));
  }

  //editor
  asignarPlantilla(): void {
    const areaSeleccionada = this.selectedAreaServicioValue();
    if (areaSeleccionada?.code === 8 || areaSeleccionada?.code === 10) {
      this.plantilla.set(_config.plantillaInfra);
    } else {
      this.plantilla.set(_config.plantillaDefault);
    }
  }

  //subir archivos

  formato(bytes: number): string {
    return formatoTamanio(bytes, this.config);
  }

  onRemoverArchivo(event: any, file: any, removeFileCallback: Function, index: number): void {
    removeFileCallback(event, index);

    this.listaDocumentos.update((current) =>
      current.filter((doc) => doc.nombre !== file.name || doc.tamaño !== file.size)
    );
  }

  onAdjuntarArchivo(event: FileSelectEvent): void {
    const archivos = event.currentFiles ?? [];

    archivos.forEach((file) => {
      convertFileToBase64(file).then((base64) => {
        this.listaDocumentos.update((current) => [
          ...current,
          {
            folio: 0,
            nombre: file.name,
            archivo: base64,
            tamaño: file.size,
            extension: file.name.split('.').pop() ?? '',
            usuario_llave_maestra: obtenerUsrLogueado().fnNumeroEmpleado?.toString() ?? '',
          },
        ]);
      });
    });
  }

  onCancelarAdjuntos(): void {
    this.listaDocumentos.set([]);
  }

  //agregar auditores
  visible: boolean = false;

  mostrarDialogoUsuarios() {
    this.visible = true;
  }

  buscarAuditor(event: { query: string }) {
    const query = event.query.trim().toLowerCase();

    if (!query) {
      this.opcionesAuditoresFiltradas.set([]);
      return;
    }

    this.ticketService.obtenerAuditores(query).subscribe({
      next: (response) => {
        if (response.exito) {
          const yaSeleccionados = this.selectedAuditorValue();
          this.opcionesAuditoresFiltradas.set(
            response.datalist
              .map((item: ICatalogoAuditor) => ({
                code: item.usuario_llave_maestra,
                name: item.nombre,
              }))
              .filter((item) => !yaSeleccionados.some((sel) => sel.code === item.code))
          );
        } else {
          this.opcionesAuditoresFiltradas.set([]);
        }
      },
      error: (err) => {
        console.error('Error al obtener catálogo:', err);
        this.opcionesAuditoresFiltradas.set([]);
      },
    });
  }

  limpiarModal(): void {
    const actuales = this.selectedAuditorValue();
    const nuevos = this.selectedAuditorValueTemp();

    const merged = [
      ...actuales,
      ...nuevos.filter((nuevo) => !actuales.some((a) => a.code === nuevo.code)),
    ];

    this.selectedAuditorValue.set(merged);
    this.selectedAuditorValueTemp.set([]);
  }

  eliminarAuditor(auditor: ICatalogoItemStr): void {
    const actuales = this.selectedAuditorValue().filter((a) => a.code !== auditor.code);
    this.selectedAuditorValue.set(actuales);

    const opciones = this.opcionesAuditoresFiltradas();

    if (!opciones.some((o) => o.code === auditor.code)) {
      this.opcionesAuditoresFiltradas.set([...opciones, auditor]);
    }
  }

  agregarAuditorInicial(): void {
    this.selectedAuditorValue.set([
      {
        code: obtenerUsrLogueado().fnNumeroEmpleado?.toString() ?? '',
        name: obtenerUsrLogueado().fcNombre ?? '',
      },
    ]);
  }

  private limpiarAuditor(items: ICatalogoItemStr[]): ICatalogoItemStr[] {
    return items.filter((item) => item.code === obtenerUsrLogueado().fnNumeroEmpleado?.toString());
  }

  onInsertarTicket(): void {
    const obj: ITicketRequest = {
      model: {
        folio: 0,
        id_area: this.selectedAreaServicioValue()?.code ?? 0,
        id_tipo_requerimiento: this.selectedRequerimientoValue()?.code ?? 0,
        id_unidad_negocio: this.selectedUnidadNegocioValue()?.code ?? 0,
        folio_honestel: 0,
        descripcion: this.plantilla() ?? '',
        usuario_llave_maestra_creacion: obtenerUsrLogueado().fnNumeroEmpleado?.toString() ?? '',
        centro_de_costos_cobro: this.selectedCecoValue()?.code.toString() ?? '',
        folio_comercio: 0,
        tipo_PSolicitud: this.selectedRequerimientoValue()?.name.toString() ?? '',
        tipo_incidente: this.selectedRequerimientoValue()?.code.toString() ?? '',
        id_referente_a: this.selectedReferenteValue()?.code ?? 0,
        listaConsultores: this.selectedAuditorValue()
          .map((item) => item.code)
          .join(','),
        listaDocumentos: this.listaDocumentos(),
      },
    };

    const errores = validarCamposRequeridos(obj.model, [
      { key: 'id_area', nombre: 'Área de servicio' },
      { key: 'id_tipo_requerimiento', nombre: 'Tipo de solicitud' },
      { key: 'id_unidad_negocio', nombre: 'Unidad de negocio' },
      { key: 'tipo_PSolicitud', nombre: 'Incidente o requerimiento' },
      { key: 'centro_de_costos_cobro', nombre: 'Ceco de facturación' },
    ]);

    if (errores.length > 0) {
      const mensaje = errores.join('<br/>');

      this.confirmationService.confirm({
        header: 'Atención: campos obligatorios faltantes',
        message: mensaje,
        icon: 'pi pi-exclamation-triangle',
        acceptVisible: false,
        rejectVisible: true,
        rejectLabel: 'Cerrar',
      });
      return;
    }

    this.ticketService.insertarTicket(obj).subscribe({
      next: (response) => {
        if (response.exito) {
          this.confirmationService.confirm({
            header: 'Éxito:',
            message: `Se ha creado la Orden de trabajo con el siguiente folio:
                      <b class="text-primary" >${response.sValor}</b>`,
            icon: 'pi pi-ticket',
            acceptVisible: true,
            rejectVisible: false,
            acceptLabel: 'Aceptar',
            accept: () => {
              //limpiamos
              this.resetFormulario();
            },
          });
        } else {
          this.confirmationService.confirm({
            header: 'Error:',
            message: 'Ocurrió un error al intentar registrar la Orden de trabajo.',
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
        console.error('Error al generar el ticket:', err);
      },
    });
  }
  resetFormulario(): void {
    this.navHelper.resetRuta('tickets/nuevo');
  }
}
