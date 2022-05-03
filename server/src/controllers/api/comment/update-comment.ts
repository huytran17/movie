import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateComment } from "../../../use-cases/comment/update-comment";
import { IGetCommentById } from "../../../use-cases/comment/get-comment-by-id";

export default function makeUpdateCommentController({
  updateComment,
  getCommentById,
  mongoose,
}: {
  updateComment: IUpdateComment;
  getCommentById: IGetCommentById;
  mongoose: Mongoose;
}) {
  return async function updateCommentController(
    httpRequest: Request & {
      context: { validated: {} };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails = _.get(httpRequest, "context.validated.data");

      const { comment_id } = _.get(httpRequest, "context.validated"); // the comment's ID
      const { content } = commentDetails;

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

      const final_comment_data = Object.assign({}, exists, {
        content,
      });

      const updatedComment = await updateComment({
        commentDetails: final_comment_data,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updatedComment,
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
