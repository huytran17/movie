import { Request } from "express";
import * as _ from "lodash";

import { IGetUserByEmail } from "../../use-cases/user/get-user-by-email";

export default function makeGetUserByUsernameController({
  getUserByEmail,
}: {
  getUserByEmail: IGetUserByEmail;
}) {
  return async function getUserByUsernameController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { email }: { email: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const user = await getUserByEmail({ email });

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
