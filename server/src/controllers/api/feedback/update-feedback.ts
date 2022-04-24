import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateFeedback } from "../../../use-cases/feedback/update-feedback";
import { IGetFeedbackById } from "../../../use-cases/feedback/get-feedback-by-id";

export default function makeUpdateFeedbackController({
  updateFeedback,
  getFeedbackById,
  mongoose,
}: {
  updateFeedback: IUpdateFeedback;
  getFeedbackById: IGetFeedbackById;
  mongoose: Mongoose;
}) {
  return async function updateFeedbackController(
    httpRequest: Request & {
      context: { validated: {} };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbackDetails = _.get(httpRequest, "context.validated.data");

      const { feedback_id } = _.get(httpRequest, "context.validated"); // the feedback's ID

      const exists = await getFeedbackById({ id: feedback_id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Feedback does not exists.",
          },
        };
      }
      const final_details = Object.assign({}, exists, feedbackDetails);
      const updatedFeedback = await updateFeedback({
        feedbackDetails: final_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updatedFeedback,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // await session.abortTransaction();
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
