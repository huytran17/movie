import { Request } from "express";
import * as _ from "lodash";
import CommentAsset from "../../../entities/comment-asset";

import { ICreateCommentAsset } from "../../../use-cases/comment-asset/create-comment-asset";

export default function makeCreateCommentAssetController({
  createCommentAsset,
}: {
  createCommentAsset: ICreateCommentAsset;
}) {
  return async function createCommentAssetController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentAssetDetails: CommentAsset = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { user, film } = _.get(httpRequest, "context.validated");

      const final_comment_asset_data = Object.assign({}, commentAssetDetails, {
        user,
        film,
      });

      const created_comment_asset = await createCommentAsset({
        commentAssetDetails: final_comment_asset_data,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_comment_asset,
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
