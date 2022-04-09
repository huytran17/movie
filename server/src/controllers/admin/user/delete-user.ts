import { Request } from "express";
import * as _ from "lodash";
import { IDeleteUserById } from "../../../use-cases/user/delete-user-by-id";

export default function makeDeleteUserController({
  deleteUserById,
}: {
  deleteUserById: IDeleteUserById;
}) {
  return async function deleteUserController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { user_id }: { user_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const user = await deleteUserById({ id: user_id });

      return {
        headers,
        statusCode: 200,
        body: { data: user }, // TODO: add in implementation of resource
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
