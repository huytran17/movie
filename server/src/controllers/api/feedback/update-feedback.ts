import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateFeedback } from "../../../use-cases/feedback/update-feedback";
import IFeedback from "../../../interfaces/feedback";
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
      context: { validated: { feedbackDetails: IFeedback } };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbackDetails: IFeedback = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { _id } = feedbackDetails; // the feedback's ID
      const exists = await getFeedbackById({ id: _id });
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

      const updatedFeedback = await updateFeedback({
        feedbackDetails,
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
