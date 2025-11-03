import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../app.configurator';
import { LayoutService } from '../../service/layout.service';
import { AuthService } from '../../../core/services/login/auth-service';
import { IUserData } from '../../../core/interfaces/IUserData';
import { Subscription } from 'rxjs';
import { obtenerNumeroEmpleado } from '../../../core/helpers/utils.helper';
import { _config } from '../../../../config';

@Component({
  selector: 'app-topbar',
  imports: [PrimeImportsModule, RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  items!: MenuItem[];
  user: IUserData | null = null;
  private userSub!: Subscription;
  constructor(public layoutService: LayoutService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((data) => {
      this.user = data;
    });
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  showPalettePanel = false;

  togglePalettePanel() {
    this.showPalettePanel = !this.showPalettePanel;
  }
  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
  onCerrarSesion() {
    const fcNumeroEmpelado = obtenerNumeroEmpleado();
    this.authService.logout(fcNumeroEmpelado, _config.cierreSesion, 1);
  }
}
