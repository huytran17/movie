import IFilmDb from "../../data-access/interfaces/film-db";
import Film from "../../entities/film";

export type IGetFilms = ({
  categories,
  series,
  exclude_ids,
  query,
  exclude_series,
}: {
  categories?: string[];
  series?: string;
  exclude_ids?: string[];
  query?: string;
  exclude_series?: boolean;
}) => Promise<Film[] | null>;

export default function makeGetFilms(filmDb: IFilmDb): IGetFilms {
  return async function getFilms({
    categories,
    series,
    exclude_ids,
    query,
    exclude_series,
  }: {
    categories?: string[];
    series?: string;
    exclude_ids?: string[];
    query?: string;
    exclude_series?: boolean;
  }): Promise<Film[] | null> {
    const films = await filmDb.findAll({
      categories,
      series,
      exclude_ids,
      query,
      exclude_series,
    });
    return films;
  };
}
