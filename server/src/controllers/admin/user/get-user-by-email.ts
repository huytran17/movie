import { Request } from "express";
import * as _ from "lodash";

import { IGetUserByEmail } from "../../../use-cases/user/get-user-by-email";

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

      const exists = await getUserByEmail({ email });

      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "User does not exist.",
          },
        };
      }

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
