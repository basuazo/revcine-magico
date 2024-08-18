import { Injectable } from '@nestjs/common';
import { Pelicula } from 'src/pelicula';
import { PlanesService } from 'src/planes/planes.service';
import { Reproduccion } from 'src/reproduccion';
import { Usuario } from 'src/usuario';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];
  constructor(private readonly planesService: PlanesService) {
    this.usuarios.push(
      new Usuario(
        1,
        'usuario1',
        'usuario1@mail.com',
        7,
        '1234',
        this.planesService.obtenerPlan(3),
        [],
        ['Animación', 'Fantasía'],
      ),
    );
    this.usuarios.push(
      new Usuario(
        2,
        'usuario2',
        'usuario2@mail.com',
        7,
        'abcd',
        this.planesService.obtenerPlan(2),
        [],
        ['Acción', 'Aventura'],
      ),
    );
    this.usuarios.push(
      new Usuario(
        3,
        'usuario3',
        'usuario3@mail.com',
        7,
        'qwerty',
        this.planesService.obtenerPlan(1),
        [],
        ['Ciencia Ficcion'],
      ),
    );
  }

  obtenerUsuario(id: number) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id == id) {
        return this.usuarios[i];
      }
    }
    return null;
  }
  modificarUsuario(id: number, usuario: Usuario) {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id == id) {
        this.usuarios[i].planSuscripcion = usuario.planSuscripcion;
        this.usuarios[i].generoFavoritos = usuario.generoFavoritos;
        return this.usuarios[i];
      }
    }
    return null;
  }

  //reproducir pelicula
  reproducirPelicula(usuario: Usuario, pelicula: Pelicula): number {
    if (pelicula.estreno && usuario.planSuscripcion.id != 3) {
      return 1;
    }
    if (!this.validarCalificacion(usuario, pelicula)) {
      return 2;
    }
    usuario.historialVisualizaciones.push(
      new Reproduccion(
        usuario.historialVisualizaciones.length + 1,
        pelicula,
        new Date(),
      ),
    );
    return 0;
  }
  validarCalificacion(usuario: Usuario, pelicula: Pelicula) {
    if (pelicula.calificacion == 'TE') return true;
    if (pelicula.calificacion == 'TE+7' && usuario.edad >= 7) return true;
    if (pelicula.calificacion == 'MA14' && usuario.edad >= 14) return true;
    if (pelicula.calificacion == 'MA18' && usuario.edad >= 18) return true;

    return false;
  }
}
