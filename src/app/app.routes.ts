import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/components/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './core/services/auth-guard';
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
    path: 'inicio',
    component: Layout,
    canActivate: [AuthGuard],
    children: [{ path: '', component: Dashboard }],
  },
];
