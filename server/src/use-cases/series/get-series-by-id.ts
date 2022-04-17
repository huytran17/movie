import Series from "../../entities/series";
import ISeriesDb from "../../data-access/interfaces/series-db";

export type IGetSeriesById = ({ id }: { id: string }) => Promise<Series | null>;

export default function makeGetSeriesById(seriesDb: ISeriesDb): IGetSeriesById {
  return async function getSeriesById({
    id,
  }: {
    id: string;
  }): Promise<Series | null> {
    const series = await seriesDb.findById({ id });
    return series;
  };
}
