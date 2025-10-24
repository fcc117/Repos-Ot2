import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../app.configurator';
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [PrimeImportsModule, RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
