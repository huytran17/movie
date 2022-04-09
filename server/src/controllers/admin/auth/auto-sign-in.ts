import _ from "lodash";
import { IGetAdminByEmail } from "../../../use-cases/admin/get-admin-by-email";
import { IVerifyAccessToken } from "../../../config/accessTokenManager/verify-access-token";

export default function makeAutoSignInController({
  getAdminByEmail,
}: {
  getAdminByEmail: IGetAdminByEmail;
  verifyAccessToken: IVerifyAccessToken;
}) {
  return async function autoSignInController(httpRequest: { context: {} }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const payload = _.get(httpRequest, "context.user");

      const email: string = _.get(payload, "email", "");
      const user = await getAdminByEmail({ email });

      if (!user) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            user: null,
            message: "User does not exists.",
          },
        };
      }

      return {
        headers,
        statusCode: 200,
        body: {
          is_error: false,
          user,
        },
      };
    } catch (err) {
      // TODO: add in error handling here
      return {
        headers,
        statusCode: 200,
        body: {
          error: err.message,
        },
      };
    }
  };
}
