import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseData } from '../../interfaces/IResponseData';
import { _config } from '../../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITicketRequest } from '../../../pages/tickets/interfaces/IEntTicket';

@Injectable({
  providedIn: 'root',
})
export class Ticketservice {
  constructor(private _httpclient: HttpClient) {}

  obtenerTotalesTicket(fcNumeroEmpleado: string): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Ticket/ObtenerTotalesTicket`, {
      fcNumeroEmpleado,
    });
  }
  obtenerAreaServicio(): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(
      `${_config.baseUrl}/Catalogo/ObtenerAreaServicio`,
      {}
    );
  }
  obtenerTipoSolicitud(idArea: number): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(
      `${_config.baseUrl}/Catalogo/ObtenerTipoSolicitud`,
      {
        idArea,
      }
    );
  }

  obtenerUnidadNegocio(idArea: number, idSolicitud: number): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(
      `${_config.baseUrl}/Catalogo/ObtenerUnidadNegocio`,
      {
        idArea,
        idSolicitud,
      }
    );
  }
  obtenerCatalogoVarios(
    opc: number,
    idParam: number,
    nombreParam: string
  ): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(
      `${_config.baseUrl}/Catalogo/ObtenerCatalogoVarios`,
      {
        opc,
        idParam,
        nombreParam,
      }
    );
  }
  obtenerReferente(
    idArea: number,
    idSolicitud: number,
    idUnidadNegocio: number,
    estatus: number
  ): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Catalogo/ObtenerReferente`, {
      idArea,
      idSolicitud,
      idUnidadNegocio,
      estatus,
    });
  }
  obtenerCeco(): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Catalogo/ObtenerCeco`, {});
  }

  obtenerAuditores(busqueda: string): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Catalogo/ObtenerAuditores`, {
      busqueda,
    });
  }

  insertarTicket(model: ITicketRequest): Observable<IResponseData> {
    return this._httpclient.post<IResponseData>(`${_config.baseUrl}/Ticket/InsertarTicket`, model);
  }
}
