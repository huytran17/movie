import _ from "lodash";
import { IGetAdminByEmail } from "../../../use-cases/admin/get-admin-by-email";
import { IGenerateAccessToken } from "../../../config/accessTokenManager/generate-access-token";
import { IVerifyPassword } from "../../../config/password/verify-password";

export default function makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
}: {
  getAdminByEmail: IGetAdminByEmail;
  generateAccessToken: IGenerateAccessToken;
  verifyPassword: IVerifyPassword;
}) {
  return async function signInController(httpRequest: {
    context: { validated: { email: string; password: string } };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const payload = _.get(httpRequest, "context.validated.data");

      const { email: _email, password }: { email: string; password: string } =
        payload;

      const email = _email.toLowerCase();

      const exists = await getAdminByEmail({ email });

      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "User does not exists.",
          },
        };
      }

      const is_valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password || "something_that_will_be_fail",
      });

      const authenticated = exists && is_valid_password;
      if (!authenticated) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "You has provided a wrong password.",
          },
        };
      }

      const access_token = await generateAccessToken(
        { email },
        { expiresIn: "1y" }
      );

      return {
        headers,
        statusCode: 200,
        body: { access_token, user: exists },
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
