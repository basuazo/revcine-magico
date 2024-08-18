import { Injectable } from '@nestjs/common';
import { Pelicula } from 'src/pelicula';

@Injectable()
export class PeliculasService {
  private peliculas: Pelicula[] = [];

  constructor() {
    this.peliculas.push(
      new Pelicula(
        1,
        'Toy Story',
        'Animacion',
        1995,
        'TE',
        81,
        'Ingles',
        ['Español', 'Frances', 'Aleman'],
        false,
      ),
    );
    this.peliculas.push(
      new Pelicula(
        2,
        'Harry potter y la piedra filosofal',
        'Fantasía',
        2020,
        'TE+7',
        152,
        'Ingles',
        ['Español', 'Aleman'],
        false,
      ),
    );
    this.peliculas.push(
      new Pelicula(
        3,
        'El Juego del Miedo',
        'Terror',
        2020,
        'MA14',
        117,
        'Ingles',
        ['Español', 'Aleman'],
        false,
      ),
    );
    this.peliculas.push(
      new Pelicula(
        4,
        'Deadpool & wolverine',
        'Acción',
        2024,
        'MA18',
        127,
        'Ingles',
        ['Español'],
        true,
      ),
    );
  }

  crearPelicula(pelicula: Pelicula): Pelicula {
    pelicula.id = this.peliculas.length + 1;
    this.peliculas.push(pelicula);
    return pelicula;
  }

  obtenerPelicula(id: number): Pelicula {
    for (let i = 0; i < this.peliculas.length; i++) {
      if (this.peliculas[i].id == id) {
        return this.peliculas[i];
      }
    }
    return null;
  }

  //obtener peliculas filtrando por género
  obtenerTodas(genero?: string): Pelicula[] {
    if (genero) {
      const peliculasFiltradas = [];
      for (let i = 0; i < this.peliculas.length; i++) {
        if (this.peliculas[i].genero == genero)
          peliculasFiltradas.push(this.peliculas[i]);
      }
      return peliculasFiltradas;
    }
    return this.peliculas;
  }
  //eliminar pelicula por id

  eliminarPelicula(id: number): boolean {
    for (let i = 0; i < this.peliculas.length; i++) {
      if (this.peliculas[i].id === id) {
        this.peliculas.splice(i, 1);
        return true;
      } else {
        return false;
      }
    }
  }
}
