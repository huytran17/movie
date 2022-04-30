import { Request } from "express";
import * as _ from "lodash";
import { Mongoose } from "mongoose";
import { IGetSeriesById } from "../../../use-cases/series/get-series-by-id";
import { IUpdateSeries } from "../../../use-cases/series/update-series";

export default function makeUploadSeriesThumbnailController({
  getSeriesById,
  updateSeries,
  mongoose,
}: {
  getSeriesById: IGetSeriesById;
  updateSeries: IUpdateSeries;
  mongoose: Mongoose;
}) {
  return async function uploadSeriesThumbnailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { series_id }: { series_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const exists = await getSeriesById({ id: series_id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Series does not exists.`,
          },
        };
      }

      const file = _.get(httpRequest, "context.file");
      if (!file) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `File does not exists.`,
          },
        };
      }

      const aws_payload = {
        mime_type: file.mimetype,
        dirname: file.key,
        size: file.size,
        name: file.originalname,
        meta: {
          bucket: file.bucket,
          acl: file.bucket,
          ...file,
        },
      };

      const series_details = Object.assign({}, exists, {
        aws_thumbnail: aws_payload,
      });

      const updated_series = await updateSeries({
        seriesDetails: series_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_series,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // TODO: revert the file upload that was done
      // await session.abortTransaction();
      console.error(err);
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: err.message,
        },
      };
    }
  };
}
