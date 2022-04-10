import { Request } from "express";
import * as _ from "lodash";
import { IGetFeedbacksByFilmId } from "../../../use-cases/feedback/get-feedbacks-by-film-id";

export default function makeGetFeedbackByFilmIdController({
  getFeedbacksByFilmId,
}: {
  getFeedbacksByFilmId: IGetFeedbacksByFilmId;
}) {
  return async function getFeedbacksByFilmIdController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const feedbacks = await getFeedbacksByFilmId();

      return {
        headers,
        statusCode: 200,
        body: { data: feedbacks }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
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
