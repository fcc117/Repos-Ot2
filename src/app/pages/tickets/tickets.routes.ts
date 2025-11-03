import { Route } from '@angular/router';

export const TICKETS_ROUTES: Route[] = [
  {
    path: 'nuevo',
    loadComponent: () => import('./ticketnuevo/ticketnuevo').then((m) => m.Ticketnuevo),
  },
  {
    path: 'consulta',
    loadComponent: () => import('./ticketconsulta/ticketconsulta').then((m) => m.Ticketconsulta),
  },
  {
    path: 'abiertos',
    loadComponent: () => import('./ticketactivos/ticketactivos').then((m) => m.Ticketactivos),
  },
];
