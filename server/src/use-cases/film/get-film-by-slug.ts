import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export type IGetFilmBySlug = ({
  slug,
}: {
  slug: string;
}) => Promise<Film | null>;

export default function makeGetFilmBySlug(filmDb: IFilmDb): IGetFilmBySlug {
  return async function getFilmBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<Film | null> {
    const film = await filmDb.findBySlug({ slug });
    return film;
  };
}
