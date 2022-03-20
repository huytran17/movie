import { Request } from "express";
import * as _ from "lodash";

import { IGetUserByUsername } from "../../use-cases/user/get-user-by-username";

export default function makeGetUserByUsernameController({
  getUserByUsername,
}: {
  getUserByUsername: IGetUserByUsername;
}) {
  return async function getUserByUsernameController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { username }: { username: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const user = await getUserByUsername({ username });

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
