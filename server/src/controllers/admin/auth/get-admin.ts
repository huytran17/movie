// import { Mongoose, Schema } from "mongoose";
import { Request } from "express";
import * as _ from "lodash";
import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";
import Admin from "../../../entities/admin";

export default function makeGetAdminController({
  getAdminById,
  moment,
}: {
  getAdminById: IGetAdminById;
  moment: any;
}) {
  return async function getAdminController(
    httpRequest: Request & { context: { user: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { _id: id }: Admin = _.get(httpRequest, "context.user");

      const user = await getAdminById({ id });
      if (!user) {
        throw new Error(`Admin by ${id} does not exists.`);
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
