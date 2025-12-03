export interface IEntTicket {
  folio: number;
  id_area: number;
  id_tipo_requerimiento: number;
  id_unidad_negocio: number;
  folio_honestel: number;
  descripcion: string;
  usuario_llave_maestra_creacion: string;
  centro_de_costos_cobro: string;
  folio_comercio: number;
  tipo_PSolicitud?: string;
  tipo_incidente?: string;
  id_referente_a: number;
  listaConsultores: string;
  listaDocumentos: IEntArchivo[];
}

export interface IEntArchivo {
  folio: number;
  nombre: string;
  archivo: string;
  tamaño: number;
  extension: string;
  usuario_llave_maestra: string;
}

export interface ITicketRequest {
  model: IEntTicket;
}
