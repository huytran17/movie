import { Request } from "express";
import * as _ from "lodash";
import { IGetCommentAssets } from "../../../use-cases/comment-asset/get-comment-assets";

export default function makeGetCommentAssetController({
  getCommentAssets,
}: {
  getCommentAssets: IGetCommentAssets;
}) {
  return async function getCommentAssetsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const comment_asset = await getCommentAssets();

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
