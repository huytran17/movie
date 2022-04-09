import { Request } from "express";
import * as _ from "lodash";
import { IRemoveCommentById } from "../../../use-cases/comment/delete-comment-by-id";

export default function makeDeleteCommentController({
  deleteCommentById,
}: {
  deleteCommentById: IRemoveCommentById;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { comment_id }: { comment_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const comment = await deleteCommentById({ id: comment_id });

      return {
        headers,
        statusCode: 200,
        body: { data: comment }, // TODO: add in implementation of resource
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
