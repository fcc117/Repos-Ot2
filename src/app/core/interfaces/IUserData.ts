import { IMenu } from './IMenu';

export interface IUserData {
  fnNumeroEmpleado?: number;
  fcNombre?: string;
  fcCorreo?: string;
  fcEmpresa?: string;
  fcGerencia?: string;
  fcCentroCostos?: string;
  fcUbicacion?: string;
  fcTipo?: string;
  fcNombres?: string;
  fcCelular?: string;
  fcLlaveMaestra?: string;
  fcApellidos?: string;
  fcPuesto?: string;
  fcPais?: string;
  fcEstatus?: string;
  extension?: string;
  fnInterno?: number;
  fdFechaInserccion?: string;
  fdFechaBaja?: string;
  fcNumeroEmpleadoJefe?: string;
  fnIdFuncionSAP?: number;
  fdFechaIngreso?: string;
  fnIdGeneralista?: number;
  menu?: IMenu[];
  lstRolesUsuario?: [];
}
