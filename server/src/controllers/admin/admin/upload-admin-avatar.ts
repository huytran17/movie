import { Request } from "express";
import * as _ from "lodash";
import { Mongoose } from "mongoose";
import { IGetAdminById } from "../../../use-cases/admin/get-admin-by-id";
import { IUpdateAdmin } from "../../../use-cases/admin/update-admin";

export default function makeUploadAdminAvatarController({
  getAdminById,
  updateAdmin,
  mongoose,
}: {
  getAdminById: IGetAdminById;
  updateAdmin: IUpdateAdmin;
  mongoose: Mongoose;
}) {
  return async function (
    httpRequest: Request & { context: { validated: {} } }
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
        throw new Error(`Admin by ${admin_id} does not exists.`);
      }

      const file = _.get(httpRequest, "context.file");
      if (!file) {
        throw new Error(`File does not exists.`);
      }

      const aws_payload = {
        mime_type: file.mimetype,
        dirname: file.key,
        size: file.size,
        name: file.originalname,
        meta: {
          bucket: file.bucket,
          acl: file.bucket,
          ...file,
        },
      };

      const new_event = Object.assign({}, exists, {
        aws: aws_payload,
      });

      const updated_event = await updateAdmin({ adminDetails: new_event });

      return {
        headers,
        statusCode: 200,
        body: {
          event: updated_event,
        }, // TODO: add in implementation of resource
      };
    } catch (err) {
      // TODO: add in error handling here
      // TODO: revert the file upload that was done
      // await session.abortTransaction();
      console.error(err);
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
