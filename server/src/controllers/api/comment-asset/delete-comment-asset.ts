import { Request } from "express";
import * as _ from "lodash";
import { IDeleteCommentAssetById } from "../../../use-cases/comment-asset/delete-comment-asset-by-id";
import { IGetCommentAssetByCommentId } from "../../../use-cases/comment-asset/get-comment-asset-by-comment-id";

export default function makeDeleteCommentAssetController({
  deleteCommentAssetById,
  getCommentAssetByCommentId,
}: {
  deleteCommentAssetById: IDeleteCommentAssetById;
  getCommentAssetByCommentId: IGetCommentAssetByCommentId;
}) {
  return async function deleteCommentAssetController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { comment_asset_id }: { comment_asset_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const exists = await getCommentAssetByCommentId({ id: comment_asset_id });

      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Comment asset does not exists.`,
          },
        };
      }

      const comment_asset = await deleteCommentAssetById({
        id: comment_asset_id,
      });

      return {
        headers,
        statusCode: 200,
        body: { data: comment_asset }, // TODO: add in implementation of resource
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
