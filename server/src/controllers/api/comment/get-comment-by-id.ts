import { Request } from "express";
import * as _ from "lodash";

import { IGetCommentById } from "../../../use-cases/comment/get-comment-by-id";

export default function makeGetCommentByCommentnameController({
  getCommentById,
}: {
  getCommentById: IGetCommentById;
}) {
  return async function getCommentByCommentnameController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { id }: { id: string } = _.get(httpRequest, "context.validated");

      const comment = await getCommentById({ id });

      return {
        headers,
        statusCode: 200,
        body: { data: comment }, // TODO: add in implementation of resource
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
