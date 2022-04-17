import Series from "../../entities/series";
import ISeriesDb from "../../data-access/interfaces/series-db";

export type IGetSeriesByFilmId = ({
  id,
}: {
  id: string;
}) => Promise<Series | null>;

export default function makeGetSeriesByFilmId(
  seriesDb: ISeriesDb
): IGetSeriesByFilmId {
  return async function getSeriesByFilmId({
    id,
  }: {
    id: string;
  }): Promise<Series | null> {
    const series = await seriesDb.findByFilmId({ film_id: id });
    return series;
  };
}
