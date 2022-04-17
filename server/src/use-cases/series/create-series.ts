import Series from "../../entities/series";
import ISeries from "../../interfaces/series";
import ISeriesDb from "../../data-access/interfaces/series-db";

export interface ICreateSeriesData {
  seriesDetails: Omit<ISeries, "_id">;
}

export type ICreateSeries = ({
  seriesDetails,
}: ICreateSeriesData) => Promise<Series | null>;

export default function makeCreateSeries(seriesDb: ISeriesDb): ICreateSeries {
  return async function createSeries({
    seriesDetails,
  }: ICreateSeriesData): Promise<Series | null> {
    const createdSeries = await seriesDb.insert(seriesDetails);
    return createdSeries;
  };
}
