import { MenuItem } from 'primeng/api';
import { IMenu } from '../interfaces/IMenu';
import { PrimeNG } from 'primeng/config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

export function obtenerRolesUsuarios(): number[] {
  const userData = localStorage.getItem('user_data');
  if (!userData) return [];

  try {
    const result = JSON.parse(userData);
    return (result.lstRolesUsuario || []).map((r: any) => r.fkIdRol);
  } catch {
    console.warn('Error al obtener: obtenerNumeroEmpleado');
    return [];
  }
}

export function construirMenu(flatMenu: IMenu[]): MenuItem[] {
  const map = new Map<number, MenuItem>();
  const tree: MenuItem[] = [];

  for (const item of flatMenu) {
    // let activeOptions = {};
    // let targetRoute = item.fcRuta;

    // if (item.fcRuta === '/tickets/consulta' || item.fcRuta === 'tickets/consulta') {
    //   targetRoute = '/tickets/consulta';
    //   activeOptions = { exact: false };
    // }
    const node: MenuItem = {
      label: item.fcDescripcion,
      icon: item.fcIcono || 'pi pi-fw pi-circle',
      routerLink: [item.fcRuta],
      // routerLink: [targetRoute],
      // routerLinkActiveOptions: activeOptions,
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

export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function validarCamposRequeridos<T extends object>(
  obj: T,
  campos: { key: keyof T; nombre: string }[]
): string[] {
  const errores: string[] = [];

  campos.forEach(({ key, nombre }) => {
    const valor = obj[key];
    if (valor === null || valor === undefined || valor === '') {
      errores.push(`El campo "${nombre}" es obligatorio`);
    }
  });

  return errores;
}

@Injectable({ providedIn: 'root' })
export class NavigationHelperService {
  constructor(private router: Router) {}

  resetRuta(ruta: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta]);
    });
  }
}

export function setSpanishLocale(primengConfig: PrimeNG) {
  primengConfig.setTranslation({
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['Do.', 'Lu.', 'Ma.', 'Mi.', 'Ju.', 'Vi.', 'Sá'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
  });
}

export function obtenerAntiguedad(fechaAlta: Date | string): string {
  if (!fechaAlta) return '-';

  const inicio = new Date(fechaAlta);
  const hoy = new Date();

  if (
    inicio.getFullYear() === hoy.getFullYear() &&
    inicio.getMonth() === hoy.getMonth() &&
    inicio.getDate() === hoy.getDate()
  ) {
    const diffMs = hoy.getTime() - inicio.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours === 1 ? `${diffHours} hora` : `${diffHours} horas`;
  }

  let años = hoy.getFullYear() - inicio.getFullYear();
  let meses = hoy.getMonth() - inicio.getMonth();
  let dias = hoy.getDate() - inicio.getDate();

  if (dias < 0) {
    meses -= 1;
    const ultimoMes = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    dias += ultimoMes.getDate();
  }

  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  const partes: string[] = [];
  if (años > 0) partes.push(`${años} año${años > 1 ? 's' : ''}`);
  if (meses > 0) partes.push(`${meses} mes${meses > 1 ? 'es' : ''}`);
  if (dias > 0) partes.push(`${dias} día${dias > 1 ? 's' : ''}`);

  return partes.length > 0 ? partes.join(' ') : '0 días';
}

export function obtenerAntiguedadAsignacion(
  fechaInicio: Date | string | null,
  fechaFin?: Date | string | null
): string {
  if (!fechaInicio) return '-';

  const inicio = new Date(fechaInicio);
  const fin = fechaFin ? new Date(fechaFin) : new Date();

  if (
    inicio.getFullYear() === fin.getFullYear() &&
    inicio.getMonth() === fin.getMonth() &&
    inicio.getDate() === fin.getDate()
  ) {
    const diffMs = fin.getTime() - inicio.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours === 1 ? `${diffHours} hora` : `${diffHours} horas`;
  }

  let años = fin.getFullYear() - inicio.getFullYear();
  let meses = fin.getMonth() - inicio.getMonth();
  let dias = fin.getDate() - inicio.getDate();

  if (dias < 0) {
    meses -= 1;
    const ultimoMes = new Date(fin.getFullYear(), fin.getMonth(), 0);
    dias += ultimoMes.getDate();
  }

  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  const partes: string[] = [];
  if (años > 0) partes.push(`${años} año${años > 1 ? 's' : ''}`);
  if (meses > 0) partes.push(`${meses} mes${meses > 1 ? 'es' : ''}`);
  if (dias > 0) partes.push(`${dias} día${dias > 1 ? 's' : ''}`);

  return partes.length > 0 ? partes.join(' ') : '0 días';
}

export function toNumeroSafe(value: string | null): number {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}
