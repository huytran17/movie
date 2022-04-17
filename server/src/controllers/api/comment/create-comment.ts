import { Request } from "express";
import * as _ from "lodash";
import Comment from "../../../entities/comment";

import { ICreateComment } from "../../../use-cases/comment/create-comment";

export default function makeCreateCommentController({
  createComment,
}: {
  createComment: ICreateComment;
}) {
  return async function createCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails: Comment = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { user, film } = _.get(httpRequest, "context.validated");

      const final_comment_data = Object.assign({}, commentDetails, {
        user,
        film,
      });

      const created_comment = await createComment({
        commentDetails: final_comment_data,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_comment,
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