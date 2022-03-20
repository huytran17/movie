import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IRemoveFilmById = ({ id }: { id: string }) => Promise<Film | null>;

export default function makeRemoveFilmById(filmDb: IFilmDb): IRemoveFilmById {
  return async function removeFilmById({
    id,
  }: {
    id: string;
  }): Promise<Film | null> {
    const deletedFilm = await filmDb.delete({ id });
    return deletedFilm;
  };
}
