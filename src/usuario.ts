import { PlanSuscripcion } from './plan-suscripcion';
import { Reproduccion } from './reproduccion';
export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public correoElectronico: string,
    public edad: number,
    public contrasena: string,
    public planSuscripcion: PlanSuscripcion,
    public historialVisualizaciones: Reproduccion[],
    public generoFavoritos: string[],
  ) {}
}
