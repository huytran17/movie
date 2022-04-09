import IFilm, {
  IGetFilmAnalyticsData,
} from "../../data-access/interfaces/film-db";

export type IGetFilmAnalytics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IGetFilmAnalyticsData | null>;

export default function makeGetFilmAnalytics({
  filmDb,
}: {
  filmDb: IFilm;
}): IGetFilmAnalytics {
  return async function getFilmAnalytics({
    distance,
    unit,
  }: {
    distance?: number;
    unit?: string;
  }): Promise<IGetFilmAnalyticsData | null> {
    const film_analytic_data = await filmDb.aggregateFilmCount({
      distance,
      unit,
    });

    return film_analytic_data;
  };
}
