import { MenuItem } from 'primeng/api';
import { IMenu } from '../interfaces/IMenu';
import { PrimeNG } from 'primeng/config';

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

export function convertFileToByteArray(file: File): Promise<Uint8Array> {
  return file.arrayBuffer().then((buffer) => new Uint8Array(buffer));
}

export function formatoTamanio(bytes: any, config: PrimeNG) {
  const k = 1024;
  const dm = 3;
  const sizes = config.translation.fileSizeTypes ?? [''];
  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
}

export function validarCamposRequeridos<T extends object>(obj: T, campos: (keyof T)[]): string[] {
  const errores: string[] = [];

  campos.forEach((campo) => {
    const valor = obj[campo];

    if (valor === null || valor === undefined || valor === '') {
      errores.push(`El campo "${String(campo)}" es obligatorio`);
    }
  });

  return errores;
}
