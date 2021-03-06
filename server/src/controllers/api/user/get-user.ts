import { Request } from "express";
import * as _ from "lodash";
import { IGetUserById } from "../../../use-cases/user/get-user-by-id";

export default function makeGetUserController({
  getUserById,
}: {
  getUserById: IGetUserById;
}) {
  return async function getUserController(
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
