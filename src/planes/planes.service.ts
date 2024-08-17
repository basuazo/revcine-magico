import { Injectable } from '@nestjs/common';
import { PlanSuscripcion } from 'src/plan-suscripcion';

@Injectable()
export class PlanesService {
  private planesSuscripcion: PlanSuscripcion[] = [];
  //2.2.1
  constructor() {
    this.planesSuscripcion.push(
      new PlanSuscripcion(1, 'Plan Básico', 3000, '720p', true),
    );
    this.planesSuscripcion.push(
      new PlanSuscripcion(2, 'Plan Estándar', 5000, '1024', true),
    );
    this.planesSuscripcion.push(
      new PlanSuscripcion(3, 'Plan Premium', 7000, '4K', false),
    );
  }

  //2.2.2
  obtenerPlan(id: number): PlanSuscripcion {
    for (let i = 0; i < this.planesSuscripcion.length; i++) {
      if (this.planesSuscripcion[i].id == +id) {
        return this.planesSuscripcion[i];
      }
    }
    return null;
  }
  obtenerTodos(): PlanSuscripcion[] {
    return this.planesSuscripcion;
  }
}
