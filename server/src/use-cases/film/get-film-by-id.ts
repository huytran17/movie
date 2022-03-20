import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IGetFilmById = ({ id }: { id: string }) => Promise<Film | null>;

export default function makeGetFilmById(filmDb: IFilmDb): IGetFilmById {
  return async function getFilmById({
    id,
  }: {
    id: string;
  }): Promise<Film | null> {
    const film = await filmDb.findById({ id });
    return film;
  };
}
