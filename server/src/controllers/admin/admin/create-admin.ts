import { Request } from "express";
import * as _ from "lodash";
import Admin from "../../../entities/admin";

import { IGetAdminByEmail } from "../../../use-cases/admin/get-admin-by-email";
import { ICreateAdmin } from "../../../use-cases/admin/create-admin";
import { IHashPassword } from "../../../config/password/hash-password";

export type IRawAdminData = Omit<Admin, "hash_password"> & {
  password: string;
  password_confirmation: string;
  email: string;
};

export default function makeCreateAdminController({
  getAdminByEmail,
  createAdmin,
  hashPassword,
}: {
  getAdminByEmail: IGetAdminByEmail;
  createAdmin: ICreateAdmin;
  hashPassword: IHashPassword;
}) {
  return async function createAdminController(
    httpRequest: Request & { context: { validated: IRawAdminData } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin: IRawAdminData = _.get(httpRequest, "context.validated.data");

      const { password, password_confirmation, email: _email } = admin;
      const email = _email.toLowerCase();
      const exists = await getAdminByEmail({ email });
      if (exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "This email has already been taken.",
          },
        };
      }

      const hash_password = await hashPassword({
        password,
        password_confirmation,
      });
      const create_admin_payload = Object.assign(
        {},
        _.omit(admin, ["password", "password_confirmation"]),
        {
          email,
          hash_password,
        }
      );
      const created_admin = await createAdmin({
        adminDetails: create_admin_payload,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          is_registered: true,
          data: created_admin,
        },
      };
    } catch (err) {
      // TODO: add in error handling here
      return {
        headers,
        statusCode: 201,
        body: {
          error: err.message,
        },
      };
    }
  };
}
