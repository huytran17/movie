import { Request } from "express";
import * as _ from "lodash";
import { IGetFeedbacks } from "../../../use-cases/feedback/get-feedbacks";

export default function makeGetFeedbacksController({
  getFeedbacks,
}: {
  getFeedbacks: IGetFeedbacks;
}) {
  return async function getFeedbacksController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const feedbacks = await getFeedbacks();

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
