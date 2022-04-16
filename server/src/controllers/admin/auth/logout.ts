import _ from "lodash";
import { IGetAdminByEmail } from "../../../use-cases/admin/get-admin-by-email";
import Admin from "../../../entities/admin";

export default function makeLogoutController({
  getAdminByEmail,
}: {
  getAdminByEmail: IGetAdminByEmail;
}) {
  return async function logoutController(httpRequest: {
    context: { validated: { email: string } };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { email }: Admin = _.get(httpRequest, "context.user");
      const exists = await getAdminByEmail({ email });

      if (!exists) {
        throw new Error(`Admin by ${email} does not exists.`);
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
