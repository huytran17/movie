import { Request } from "express";
import * as _ from "lodash";
import { IRestoreAdminById } from "../../../use-cases/admin/restore-admin-by-id";

export default function makeRestoreAdminController({
  restoreAdminById,
}: {
  restoreAdminById: IRestoreAdminById;
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
