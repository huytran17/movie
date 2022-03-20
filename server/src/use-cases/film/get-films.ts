import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IGetFilms = () => Promise<Film[] | null>;

export default function makeGetFilms(filmDb: IFilmDb): IGetFilms {
  return async function getFilms(): Promise<Film[] | null> {
    const films = await filmDb.findAll();
    return films;
  };
}
