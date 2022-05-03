import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateCommentAsset } from "../../../use-cases/comment-asset/update-comment-asset";
import { IGetCommentAssetByCommentId } from "../../../use-cases/comment-asset/get-comment-asset-by-comment-id";
import { IGetCommentById } from "../../../use-cases/comment/get-comment-by-id";
import { ICreateComment } from "../../../use-cases/comment/create-comment";
import Comment from "../../../entities/comment";

export default function makeReplyCommentController({
  createComment,
  updateCommentAsset,
  getCommentById,
  getCommentAssetByCommentId,
  mongoose,
}: {
  createComment: ICreateComment;
  getCommentById: IGetCommentById;
  updateCommentAsset: IUpdateCommentAsset;
  getCommentAssetByCommentId: IGetCommentAssetByCommentId;
  mongoose: Mongoose;
}) {
  return async function replyCommentController(
    httpRequest: Request & {
      context: { validated: {} };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails: Comment = _.get(
        httpRequest,
        "context.validated.data"
      );
      const { user, film, parent_comment_id } = _.get(
        httpRequest,
        "context.validated"
      );

      const exists = await getCommentById({ id: parent_comment_id });
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

      const comment_asset_exists = await getCommentAssetByCommentId({
        id: exists._id,
      });

      if (!comment_asset_exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Comment asset does not exists.",
          },
        };
      }

      const final_comment_data = Object.assign({}, commentDetails, {
        user,
        film,
      });

      const created_comment = await createComment({
        commentDetails: final_comment_data,
      });

      const children_array = _.get(comment_asset_exists, "children", []);
      const new_children_array = children_array.push(created_comment);

      const final_comment_asset_data = Object.assign({}, comment_asset_exists, {
        children: new_children_array,
      });

      const created_comment_asset = await updateCommentAsset({
        commentAssetDetails: final_comment_asset_data,
      });

      if (!created_comment_asset) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Failed when updating comment asset.",
          },
        };
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: created_comment,
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
