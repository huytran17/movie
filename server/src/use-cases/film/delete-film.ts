import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IRemoveFilm = ({ id }: { id: string }) => Promise<Film | null>;

export default function makeRemoveFilm(filmDb: IFilmDb): IRemoveFilm {
  return async function removeFilm({
    id,
  }: {
    id: string;
  }): Promise<Film | null> {
    const deletedFilm = await filmDb.delete({ id });
    return deletedFilm;
  };
}
