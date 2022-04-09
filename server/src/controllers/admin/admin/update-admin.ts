import { Request } from "express";
import { Mongoose } from "mongoose";
import * as _ from "lodash";

import { IUpdateAdmin } from "../../../use-cases/admin/update-admin";
import IAdmin from "../../../interfaces/admin";
import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";

export default function makeUpdateAdminController({
  updateAdmin,
  getAdminById,
  mongoose,
}: {
  updateAdmin: IUpdateAdmin;
  getAdminById: IGetAdminById;
  mongoose: Mongoose;
}) {
  return async function updateAdminController(
    httpRequest: Request & { context: { validated: { adminDetails: IAdmin } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const adminDetails: IAdmin = _.get(httpRequest, "context.validated");

      const { _id: admin_id } = adminDetails; // the admin's ID
      const exists = await getAdminById({ id: admin_id });
      if (!exists) {
        throw new Error(`Admin by ${admin_id} does not exists.`);
      }

      const updatedAdmin = await updateAdmin({
        adminDetails,
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
