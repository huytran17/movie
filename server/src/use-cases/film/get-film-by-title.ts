import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IGetFilmByTitle = ({
  title,
}: {
  title: string;
}) => Promise<Film | null>;

export default function makeGetFilmByTitle(filmDb: IFilmDb): IGetFilmByTitle {
  return async function getFilmByTitle({
    title,
  }: {
    title: string;
  }): Promise<Film | null> {
    const film = await filmDb.findByTitle({ title });
    return film;
  };
}
