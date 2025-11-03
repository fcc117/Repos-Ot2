import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseData } from '../../interfaces/IResponseData';
import { _config } from '../../../../config';
import { HttpClient } from '@angular/common/http';

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
}
