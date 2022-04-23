import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateComment } from "../../../use-cases/comment/update-comment";
import IComment from "../../../interfaces/comment";
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
      context: { validated: { commentDetails: IComment } };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails: IComment = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { _id } = commentDetails; // the comment's ID
      const exists = await getCommentById({ id: _id });
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

      const updatedComment = await updateComment({
        commentDetails,
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
