import { Body, Controller, Post, Get, Param, Put, Res } from '@nestjs/common';
import { PeliculasService } from 'src/peliculas/peliculas.service';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/usuario';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly peliculaService: PeliculasService,
  ) {}

  //registrar nuevo usuario
  @Post()
  registrarUsuariO(@Body() usuario: Usuario) {
    return usuario;
  }

  //obtener a usuario por id
  @Get(':id')
  obtenerUsuario(@Param('id') id: number) {
    return this.usuariosService.obtenerUsuario(id);
  }

  //modificar usuario segun id
  @Put(':id')
  modificarUsuario(@Param('id') id: number, @Body() usuario: Usuario) {
    return this.usuariosService.modificarUsuario(id, usuario);
  }

  @Post(':idusuario/peliculas/:idPelicula')
  reproducirPelicula(
    @Param('idUsuario') id: number,
    @Param('idPelicula') idPelicula: number,
    @Res() res: Response,
  ) {
    const usuario = this.usuariosService.obtenerUsuario(id);
    const pelicula = this.peliculaService.obtenerPelicula(idPelicula);

    if (!pelicula) {
      res.status(404).send('La Pelicula no Existe');
    } else {
      const resultado = this.usuariosService.reproducirPelicula(
        usuario,
        pelicula,
      );
      if (resultado == 0) {
        res.status(200).send('OK');
      }
      if (resultado == 1) {
        res.status(400).send('Su plan no permite reproducir la pelicula');
      }
      if (resultado == 2) {
        res.status(400).send('La pelicula no es apta');
      }
    }
  }
}
