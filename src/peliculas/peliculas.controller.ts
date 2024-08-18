import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Query,
  Delete,
} from '@nestjs/common';
import { Pelicula } from 'src/pelicula';
import { PeliculasService } from './peliculas.service';
import { Response } from 'express';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}
  //crear pelicula
  @Post()
  crearPelicula(@Body() pelicula: Pelicula) {
    return this.peliculasService.crearPelicula(pelicula);
  }

  //peli por id
  @Get('id')
  obtenerPelicula(@Param('id') id: number, @Res() res: Response) {
    const pelicula = this.peliculasService.obtenerPelicula(id);
    if (pelicula) {
      res.status(200).send(pelicula);
    } else {
      res.status(404).send('La pelicula no existe');
    }
  }
  @Get()
  obtenerTodas(@Query('genero') genero: string) {
    return this.peliculasService.obtenerTodas(genero);
  }

  //eliminar pelicula
  @Delete(':id')
  eliminarPelicula(@Param('id') id: number, @Res() res: Response) {
    const eliminar = this.peliculasService.eliminarPelicula(id);
    if (eliminar) {
      res.status(200).send('Pelicula eliminada');
    } else {
      res.status(404).send('pelicula no eliminada');
    }
  }
}
