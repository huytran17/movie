import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateUser } from "../../../use-cases/user/update-user";
import IUser from "../../../interfaces/user";
import { IGetUserById } from "../../../use-cases/user/get-user-by-id";
import { IVerifyPassword } from "../../../config/password/verify-password";
import { IHashPassword } from "../../../config/password/hash-password";

export default function makeUpdatePasswordController({
  updateUser,
  getUserById,
  verifyPassword,
  hashPassword,
  mongoose,
}: {
  updateUser: IUpdateUser;
  getUserById: IGetUserById;
  verifyPassword: IVerifyPassword;
  hashPassword: IHashPassword;
  mongoose: Mongoose;
}) {
  return async function updatePasswordController(
    httpRequest: Request & { context: { validated: { userDetails: IUser } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { old_password, password, password_confirmation } = _.get(
        httpRequest,
        "context.validated.data"
      );
      const { user_id } = _.get(httpRequest, "context.validated");

      const exists = await getUserById({ id: user_id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `User does not exists.`,
          },
        };
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

      const updatedUser = await updateUser({
        userDetails: update_user_payload,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updatedUser,
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
