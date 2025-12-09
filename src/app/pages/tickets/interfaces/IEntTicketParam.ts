export interface IEntTicketParam {
  usuarioLlaveMaestra: string;

  folioTicket: number;
  auditorSolicitante: string;

  antiguedadRango: string;
  antiguedad: number;

  fechaRegistroDesde?: Date | null;
  fechaRegistroHasta?: Date | null;

  idEstatus: number;

  fechaCierreDesde?: Date | null;
  fechaCierreHasta?: Date | null;

  idVerRegistros: number;
  idArea: number;
}

export interface IEntTickets {
  folio: number;

  fecha_alta: Date;
  fecha_asignacion: Date;
  fecha_cierre: Date;

  usuario_creacion: string;
  areas: string;
  tipo_requerimiento: string;
  unidad_negocio: string;
  referente_a: string;

  estatus: string;
  id_estatus: number;

  centro_de_costos_cobro: string;

  horas_a_cobrar?: number | null;
  minutos_a_cobrar?: number | null;

  usuario_que_atendio: string;

  antiguedad_calculada: string;
  asignacion_calculada: string;
  solicitud_calculada: string;
}

export interface ITicketsRequest {
  model: IEntTicketParam;
}
