import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menuitems } from '../menuitems/menuitems';
import { AuthService } from '../../../core/services/login/auth-service';
import { IMenu } from '../../../core/interfaces/IMenu';
import { construirMenu } from '../../../core/helpers/utils.helper';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, Menuitems, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true,
})
export class Menu {
  constructor(private authService: AuthService) {}
  model: MenuItem[] = [];

  menu: IMenu[] = [];

  ngOnInit() {
    this.authService.userData$.subscribe((data) => {
      this.menu = data?.menu ?? [];
      if (this.menu) {
        this.model = construirMenu(this.menu);
      }
    });

    // this.model = [
    //   {
    //     label: 'Inicio',
    //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/inicio'] }],
    //   },
    //   {
    //     label: 'Tickets',
    //     items: [
    //       {
    //         label: 'Button',
    //         icon: 'pi pi-fw pi-mobile',
    //         class: 'rotated-icon',
    //         routerLink: ['/uikit/button'],
    //       },
    //       { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
    //     ],
    //   },
    //   {
    //     label: 'Administración de sistema',
    //     icon: 'pi pi-fw pi-briefcase',
    //     routerLink: ['/pages'],
    //     items: [
    //       {
    //         label: 'Auth',
    //         icon: 'pi pi-fw pi-user',
    //         items: [
    //           {
    //             label: 'Login',
    //             icon: 'pi pi-fw pi-sign-in',
    //             routerLink: ['/auth/login'],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Hierarchy',
    //     items: [
    //       {
    //         label: 'Submenu 1',
    //         icon: 'pi pi-fw pi-bookmark',
    //         items: [
    //           {
    //             label: 'Submenu 1.1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //               { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //               { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ];
  }
}
