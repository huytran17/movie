import { Request } from "express";
import * as _ from "lodash";
import { IGetUsers } from "../../../use-cases/user/get-users";

export default function makeGetUsersController({
  getUsers,
}: {
  getUsers: IGetUsers;
}) {
  return async function getUsersController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const users = await getUsers();

      return {
        headers,
        statusCode: 200,
        body: { data: users }, // TODO: add in implementation of resource
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
