import Series from "../../entities/series";
import ISeriesDb from "../../data-access/interfaces/series-db";
import ISeries from "../../interfaces/series";
import _ from "lodash";

interface IUpdateSeriesData {
  seriesDetails: Partial<ISeries>;
}
export type IUpdateSeries = ({
  seriesDetails,
}: IUpdateSeriesData) => Promise<Series | null>;

export default function makeUpdateSeries(seriesDb: ISeriesDb): IUpdateSeries {
  return async function updateSeries({
    seriesDetails,
  }: IUpdateSeriesData): Promise<Series | null> {
    const existing_by_id = await seriesDb.findById({
      id: seriesDetails._id as string,
    });
    const existing = existing_by_id;

    if (!existing) {
      throw new RangeError("Series not found.");
    }

    const omit_list = ["_id"];

    const final_series_detail = _.omit(seriesDetails, omit_list);
    const series = new Series(
      Object.assign({}, existing, final_series_detail, {
        updated_at: new Date(),
      })
    );

    const updatedSeries = await seriesDb.update(series);
    return updatedSeries;
  };
}
