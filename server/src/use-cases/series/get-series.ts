import Series from "../../entities/series";
import ISeriesDb from "../../data-access/interfaces/series-db";

export type IGetSeries = () => Promise<Series[] | null>;

export default function makeGetSeries(seriesDb: ISeriesDb): IGetSeries {
  return async function getSeries(): Promise<Series[] | null> {
    const series = await seriesDb.findAll();
    return series;
  };
}
