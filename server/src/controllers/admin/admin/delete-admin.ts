import { Request } from "express";
import * as _ from "lodash";
import { IRemoveAdminById } from "../../../use-cases/admin/delete-admin-by-id";

export default function makeDeleteAdminController({
  deleteAdminById,
}: {
  deleteAdminById: IRemoveAdminById;
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
