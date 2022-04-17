import Series from "../../entities/series";
import ISeriesDb from "../../data-access/interfaces/series-db";

export type IRemoveSeriesById = ({
  id,
}: {
  id: string;
}) => Promise<Series | null>;

export default function makeRemoveSeriesById(
  seriesDb: ISeriesDb
): IRemoveSeriesById {
  return async function removeSeriesById({
    id,
  }: {
    id: string;
  }): Promise<Series | null> {
    const deletedSeries = await seriesDb.delete({ id });
    return deletedSeries;
  };
}
