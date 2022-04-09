import { Request } from "express";
import * as _ from "lodash";
import { IGetAdmins } from "../../../use-cases/admin/get-admins";

export default function makeGetAdminsController({
  getAdmins,
}: {
  getAdmins: IGetAdmins;
}) {
  return async function getAdminsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const admins = await getAdmins();

      return {
        headers,
        statusCode: 200,
        body: { data: admins }, // TODO: add in implementation of resource
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
