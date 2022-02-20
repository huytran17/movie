import { Request } from "express";
import * as _ from "lodash";
import User from "../../entities/user";

import { IGetUserByEmail } from "../../use-cases/user/get-user-by-email";
import { ICreateUser } from "../../use-cases/user/create-user";
import { IHashPassword } from "../../config/password/hash-password";

export type IRawUserData = Omit<User, "hash_password"> & {
  password: string;
  password_confirmation: string;
};

export default function makeSignUpController({
  getUserByEmail,
  createUser,
  hashPassword,
}: {
  getUserByEmail: IGetUserByEmail;
  createUser: ICreateUser;
  hashPassword: IHashPassword;
}) {
  return async function signUpController(
    httpRequest: Request & { context: { validated: IRawUserData } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const user: IRawUserData = _.get(httpRequest, "context.validated.data");

      const { password, password_confirmation, email: _email } = user;
      const email = _email.toLowerCase();
      const exists = await getUserByEmail({ email });
      if (exists) {
        throw {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 400,
          body: {
            error:
              "This email has already been taken. If this is you, login instead.",
          },
        };
      }

      const hash_password = await hashPassword({
        password,
        password_confirmation,
      });
      const create_user_payload = Object.assign(
        {},
        _.omit(user, ["password", "password_confirmation"]),
        {
          email,
          hash_password,
        }
      );
      const created_user = await createUser({
        userDetails: create_user_payload,
      });

      return {
        headers,
        statusCode: 201,
        body: {
          is_registered: true,
          data: created_user,
        },
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
