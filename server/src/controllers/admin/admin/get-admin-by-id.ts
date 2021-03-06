import { Request } from "express";
import * as _ from "lodash";

import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";

export default function makeGetAdminByAdminnameController({
  getAdminById,
}: {
  getAdminById: IGetAdminById;
}) {
  return async function getAdminByAdminnameController(
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

      return {
        headers,
        statusCode: 200,
        body: { data: exists }, // TODO: add in implementation of resource
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
