import { Request } from "express";
import * as _ from "lodash";
import { IRemoveFeedback } from "../../../use-cases/feedback/delete-feedback";

export default function makeDeleteFeedbackController({
  deleteFeedbackById,
}: {
  deleteFeedbackById: IRemoveFeedback;
}) {
  return async function deleteFeedbackController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { feedback_id }: { feedback_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const feedback = await deleteFeedbackById({ id: feedback_id });

      return {
        headers,
        statusCode: 200,
        body: { data: feedback }, // TODO: add in implementation of resource
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
