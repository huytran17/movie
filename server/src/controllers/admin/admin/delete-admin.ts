import { Request } from "express";
import * as _ from "lodash";
import { IRemoveAdminById } from "../../../use-cases/admin/delete-admin-by-id";
import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";

export default function makeDeleteAdminController({
  deleteAdminById,
  getAdminById,
}: {
  deleteAdminById: IRemoveAdminById;
  getAdminById: IGetAdminById;
}) {
  return async function deleteAdminController(
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

      const admin = await deleteAdminById({ id: admin_id });

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
