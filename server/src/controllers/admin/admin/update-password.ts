import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateAdmin } from "../../../use-cases/admin/update-admin";
import IAdmin from "../../../interfaces/admin";
import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";
import { IVerifyPassword } from "../../../config/password/verify-password";
import { IHashPassword } from "../../../config/password/hash-password";

export default function makeUpdatePasswordController({
  updateAdmin,
  getAdminById,
  verifyPassword,
  hashPassword,
  mongoose,
}: {
  updateAdmin: IUpdateAdmin;
  getAdminById: IGetAdminById;
  verifyPassword: IVerifyPassword;
  hashPassword: IHashPassword;
  mongoose: Mongoose;
}) {
  return async function updatePasswordController(
    httpRequest: Request & { context: { validated: { adminDetails: IAdmin } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { old_password, password, password_confirmation } = _.get(
        httpRequest,
        "context.validated.data"
      );
      const { admin_id } = _.get(httpRequest, "context.validated");

      const exists = await getAdminById({ id: admin_id });
      if (!exists) {
        throw new Error(`Admin by ${admin_id} does not exists.`);
      }

      const is_valid_password = await verifyPassword({
        password: old_password,
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

      const hash_password = await hashPassword({
        password,
        password_confirmation,
      });
      const update_user_payload = Object.assign({}, exists, {
        hash_password,
      });

      const updatedAdmin = await updateAdmin({
        adminDetails: update_user_payload,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          admin: updatedAdmin,
        }, // TODO: add in implementation of resource
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
