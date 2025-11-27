import { MenuItem } from 'primeng/api';
import { IMenu } from '../interfaces/IMenu';

export function obtenerNumeroEmpleado(): string {
  const userData = localStorage.getItem('user_data');
  if (!userData) return '';

  try {
    const result = JSON.parse(userData);
    return result?.fnNumeroEmpleado.toString() || null;
  } catch {
    console.warn('Error al obtener: obtenerNumeroEmpleado');
    return '';
  }
}

export function construirMenu(flatMenu: IMenu[]): MenuItem[] {
  const map = new Map<number, MenuItem>();
  const tree: MenuItem[] = [];

  for (const item of flatMenu) {
    const node: MenuItem = {
      label: item.fcDescripcion,
      icon: item.fcIcono || 'pi pi-fw pi-circle',
      routerLink: [item.fcRuta],
      ...(flatMenu.some((m) => m.fiMenuPadre === item.pkMenu) ? { items: [] } : {}),
    };
    map.set(item.pkMenu, node);
  }

  for (const item of flatMenu) {
    const node = map.get(item.pkMenu)!;
    if (item.fiMenuPadre && map.has(item.fiMenuPadre)) {
      map.get(item.fiMenuPadre)!.items!.push(node);
    } else {
      tree.push(node);
    }
  }

  return tree;
}

export function obtenerUsrLogueado(): any {
  const userData = localStorage.getItem('user_data');
  if (!userData) return '';

  try {
    const result = JSON.parse(userData);
    return result || null;
  } catch {
    console.warn('Error al parsear user_data');
    return '';
  }
}
