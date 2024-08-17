import { Controller, Get, Res, Param } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { Response } from 'express';
import { get } from 'http';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}
  //2.1.1
  @Get('id')
  obtenerPlan(@Param('id') id: number, @Res() res: Response) {
    const plan = this.planesService.obtenerPlan(id);
    if (plan) {
      res.status(200).send(plan);
    } else {
      res.status(404).send('plan no existe');
    }
  }
  //obtener todos los planes
  @Get()
  obtenerTodos() {
    return this.planesService.obtenerTodos();
  }
}
