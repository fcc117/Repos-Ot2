import { Routes } from '@angular/router';
import { Layout } from './layout/components/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './core/services/login/auth-guard';
import { TICKETS_ROUTES } from './pages/tickets/tickets.routes';
import { ADMIN_ROUTES } from './pages/administracion/administracion.routes';
import { LayoutService } from './layout/service/layout.service';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'sesionexistente',
    loadComponent: () =>
      import('./pages/alertas/sesionexistente/sesionexistente').then((m) => m.Sesionexistente),
  },
  {
    path: 'perfilnoautorizado',
    loadComponent: () =>
      import('./pages/alertas/perfilnoautorizado/perfilnoautorizado').then(
        (m) => m.Perfilnoautorizado
      ),
  },
  {
    path: 'sinacceso',
    loadComponent: () => import('./pages/alertas/sinacceso/sinacceso').then((m) => m.Sinacceso),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/alertas/error/error').then((m) => m.Error),
  },
  {
    path: 'inicio',
    component: Layout,
    canActivate: [AuthGuard],
    children: [{ path: '', component: Dashboard }],
  },
  {
    path: 'tickets',
    component: Layout,
    canActivate: [AuthGuard],
    children: TICKETS_ROUTES,
  },
  {
    path: 'administracion',
    component: Layout,
    canActivate: [AuthGuard],
    children: ADMIN_ROUTES,
  },
];
