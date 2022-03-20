import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IGetFilmByName = ({
  film_name,
}: {
  film_name: string;
}) => Promise<Film | null>;

export default function makeGetFilmByName(filmDb: IFilmDb): IGetFilmByName {
  return async function getFilmByName({
    film_name,
  }: {
    film_name: string;
  }): Promise<Film | null> {
    const film = await filmDb.findByName({ film_name });
    return film;
  };
}
