import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";
import User from "../../../entities/user";
import { IUpdateComment } from "../../../use-cases/comment/update-comment";
import { IGetCommentById } from "../../../use-cases/comment/get-comment-by-id";
import { IGetUserById } from "../../../use-cases/user/get-user-by-id";

export default function makeLikeCommentController({
  updateComment,
  getCommentById,
  getUserById,
  mongoose,
}: {
  updateComment: IUpdateComment;
  getCommentById: IGetCommentById;
  getUserById: IGetUserById;
  mongoose: Mongoose;
}) {
  return async function likeCommentController(
    httpRequest: Request & {
      context: { validated: {} };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { comment_id, user_id } = _.get(httpRequest, "context.validated"); // the comment's ID

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

      let users_liked = _.get(exists, "meta.liked_by", []);

      const user = await getUserById({ id: user_id });

      if (!user) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "User does not exists.",
          },
        };
      }
      const liked = users_liked.some(
        (_user: User) => String(_user._id) === String(user._id)
      );

      if (liked) {
        users_liked = users_liked.filter(
          (user_liked: any) => String(user_liked._id) !== String(user._id)
        );
      } else {
        users_liked.push(user);
      }

      const final_comment_data = Object.assign({}, exists, {
        meta: {
          liked_by: _.uniq(_.compact(users_liked)),
        },
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
