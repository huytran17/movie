import _ from "lodash";
import { IGetUserByEmail } from "../../../use-cases/user/get-user-by-email";
import User from "../../../entities/user";

export default function makeLogoutController({
  getUserByEmail,
}: {
  getUserByEmail: IGetUserByEmail;
}) {
  return async function logoutController(httpRequest: {
    context: { validated: { email: string } };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { email }: User = _.get(httpRequest, "context.user");
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
        body: {
          data: { is_logout: true },
        },
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
