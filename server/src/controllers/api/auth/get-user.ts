// import { Mongoose, Schema } from "mongoose";
import { Request } from "express";
import * as _ from "lodash";
import { IGetUserById } from "../../../use-cases/user/get-user-by-id";
import User from "../../../entities/user";

export default function makeGetUserController({
  getUserById,
  moment,
}: {
  getUserById: IGetUserById;
  moment: any;
}) {
  return async function getUserController(
    httpRequest: Request & { context: { user: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { _id: id }: User = _.get(httpRequest, "context.user");
      const user = await getUserById({ id });
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
        body: { data: user }, // TODO: add in implementation of resource
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
