import { Request } from "express";
import * as _ from "lodash";
import { IGetComments } from "../../../use-cases/comment/get-comments";

export default function makeGetCommentsController({
  getComments,
}: {
  getComments: IGetComments;
}) {
  return async function getCommentsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const comments = await getComments();

      return {
        headers,
        statusCode: 200,
        body: { data: comments }, // TODO: add in implementation of resource
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
