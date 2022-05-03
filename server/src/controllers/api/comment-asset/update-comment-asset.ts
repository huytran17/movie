import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateCommentAsset } from "../../../use-cases/comment-asset/update-comment-asset";
import ICommentAsset from "../../../interfaces/comment-asset";
import { IGetCommentAssetByCommentId } from "../../../use-cases/comment-asset/get-comment-asset-by-comment-id";

export default function makeUpdateCommentAssetController({
  updateCommentAsset,
  getCommentAssetByCommentId,
  mongoose,
}: {
  updateCommentAsset: IUpdateCommentAsset;
  getCommentAssetByCommentId: IGetCommentAssetByCommentId;
  mongoose: Mongoose;
}) {
  return async function updateCommentAssetController(
    httpRequest: Request & {
      context: { validated: { commentAssetDetails: ICommentAsset } };
    }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentAssetDetails: ICommentAsset = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { _id } = commentAssetDetails; // the comment-asset's ID
      const exists = await getCommentAssetByCommentId({ id: _id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `CommentAsset does not exists.`,
          },
        };
      }

      const updatedCommentAsset = await updateCommentAsset({
        commentAssetDetails,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updatedCommentAsset,
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
