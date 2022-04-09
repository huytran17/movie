import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateUser } from "../../../use-cases/user/update-user";
import IUser from "../../../interfaces/user";
import { IGetUserById } from "../../../use-cases/user/get-user-by-id";

export default function makeUpdateUserController({
  updateUser,
  getUserById,
  mongoose,
}: {
  updateUser: IUpdateUser;
  getUserById: IGetUserById;
  mongoose: Mongoose;
}) {
  return async function updateUserController(
    httpRequest: Request & { context: { validated: { userDetails: IUser } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const userDetails: IUser = _.get(httpRequest, "context.validated");

      const { _id: user_id } = userDetails; // the user's ID
      const exists = await getUserById({ id: user_id });
      if (!exists) {
        throw new Error(`User by ${user_id} does not exists.`);
      }

      const updatedUser = await updateUser({
        userDetails,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          user: updatedUser,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // await session.abortTransaction();
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
