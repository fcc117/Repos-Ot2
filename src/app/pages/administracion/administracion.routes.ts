import { Route } from '@angular/router';

export const ADMIN_ROUTES: Route[] = [
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/adminusuarios').then((m) => m.Adminusuarios),
  },
  {
    path: 'catalogos',
    loadComponent: () => import('./catalogos/admincatalogos').then((m) => m.Admincatalogos),
  },
  {
    path: 'usuariosbloqueados',
    loadComponent: () => import('./bloqueados/adminbloqueados').then((m) => m.Adminbloqueados),
  },
];
