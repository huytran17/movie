import { Request } from "express";
import * as _ from "lodash";
import Feedback from "../../../entities/feedback";

import { ICreateFeedback } from "../../../use-cases/feedback/create-feedback";

export default function makeCreateFeedbackController({
  createFeedback,
}: {
  createFeedback: ICreateFeedback;
}) {
  return async function createFeedbackController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbackDetails: Feedback = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { user, film } = _.get(httpRequest, "context.validated");

      const final_feedback_details = Object.assign({}, feedbackDetails, {
        user,
        film,
      });
      const created_feedback = await createFeedback({
        feedbackDetails: final_feedback_details,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_feedback,
        },
      };
    } catch (err) {
      // TODO: add in error handling here
      return {
        headers,
        statusCode: 201,
        body: {
          error: err.message,
        },
      };
    }
  };
}
