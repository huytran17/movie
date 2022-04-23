import { Request } from "express";
import * as _ from "lodash";
import { IRemoveCommentById } from "../../../use-cases/comment/delete-comment-by-id";
import { IGetCommentById } from "../../../use-cases/comment/get-comment-by-id";

export default function makeDeleteCommentController({
  deleteCommentById,
  getCommentById,
}: {
  deleteCommentById: IRemoveCommentById;
  getCommentById: IGetCommentById;
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

      const exists = await getCommentById({ id: comment_id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Comment does not exists.",
          },
        };
      }

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
