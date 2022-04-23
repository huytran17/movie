import { Request } from "express";
import * as _ from "lodash";
import { IRestoreAdminById } from "../../../use-cases/admin/restore-admin-by-id";
import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";

export default function makeRestoreAdminController({
  restoreAdminById,
  getAdminById,
}: {
  restoreAdminById: IRestoreAdminById;
  getAdminById: IGetAdminById;
}) {
  return async function restoreAdminController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { admin_id }: { admin_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const exists = await getAdminById({ id: admin_id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Admin does not exist.",
          },
        };
      }

      const admin = await restoreAdminById({ id: admin_id });

      return {
        headers,
        statusCode: 200,
        body: { data: admin }, // TODO: add in implementation of resource
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
