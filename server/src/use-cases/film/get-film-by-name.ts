import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IGetFilmByFilmname = ({
  film_name,
}: {
  film_name: string;
}) => Promise<Film | null>;

export default function makeGetFilmByFilmname(
  filmDb: IFilmDb
): IGetFilmByFilmname {
  return async function getFilmByFilmname({
    film_name,
  }: {
    film_name: string;
  }): Promise<Film | null> {
    const film = await filmDb.findByName({ film_name });
    return film;
  };
}
