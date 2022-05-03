import { Request } from "express";
import * as _ from "lodash";

import { IGetCommentAssetsByFilmId } from "../../../use-cases/comment-asset/get-comment-assets-by-film-id";
import { IGetFilmById } from "../../../use-cases/film/get-film-by-id";

export default function makeGetCommentAssetsByFilmIdController({
  getCommentAssetsByFilmId,
  getFilmById,
}: {
  getCommentAssetsByFilmId: IGetCommentAssetsByFilmId;
  getFilmById: IGetFilmById;
}) {
  return async function getCommentAssetsByFilmIdController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { film_id } = _.get(httpRequest, "context.validated");

      const film_exists = await getFilmById({ id: film_id });

      if (!film_exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Film does not exists.",
          },
        };
      }

      const exists = await getCommentAssetsByFilmId({ film_id });

      return {
        headers,
        statusCode: 200,
        body: { data: exists }, // TODO: add in implementation of resource
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
