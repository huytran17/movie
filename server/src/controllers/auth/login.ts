import _ from "lodash";
import { IGetUserByEmail } from "../../use-cases/user/get-user-by-email";
import { IGenerateAccessToken } from "../../config/accessTokenManager/generate-access-token";
import { IVerifyPassword } from "../../config/password/verify-password";

export default function makeLoginUserController({
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
}: {
  getUserByEmail: IGetUserByEmail;
  generateAccessToken: IGenerateAccessToken;
  verifyPassword: IVerifyPassword;
}) {
  return async function loginUser(httpRequest: {
    context: { validated: { email: string } };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const payload = _.get(httpRequest, "context.validated.data");

      const { email: _email, password }: { email: string; password: string } =
        payload;

      const email = _email.toLowerCase();

      const exists = await getUserByEmail({ email });

      if (!exists) {
        throw new Error(`User by ${email} does not exists.`);
      }

      const is_valid_password = await verifyPassword({
        password,
        hash_password: exists.hash_password || "something_that_will_be_fail",
      });

      const authenticated = exists && is_valid_password;
      if (!authenticated) {
        throw new Error(`User by ${email} has provided a wrong password.`);
      }

      const access_token = await generateAccessToken(
        { email },
        { expiresIn: "1y" }
      );

      return {
        headers,
        statusCode: 200,
        access_token,
      };
    } catch (err) {
      // TODO: add in error handling here
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 500,
        body: {
          error: err.message,
        },
      };
    }
  };
}
