import { Request } from "express";
import * as _ from "lodash";

import { IGetUserBySlug } from "../../../use-cases/user/get-user-by-slug";
import { IGetUserById } from "../../../use-cases/user/get-user-by-id";

export default function makeGetUserBySlugController({
  getUserById,
  getUserBySlug,
}: {
  getUserById: IGetUserById;
  getUserBySlug: IGetUserBySlug;
}) {
  return async function getUserBySlugController(
    httpRequest: Request & { context: { validated: { _id: string } } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { slug }: { slug: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const [user_by_id_exists, user_by_slug_exists] = await Promise.all([
        getUserById({ id: slug }),
        getUserBySlug({ slug: slug }),
      ]);

      const user_exists = user_by_id_exists || user_by_slug_exists;
      if (!user_exists) {
        throw new Error(`User ${slug} does not exists.`);
      }

      return {
        headers,
        statusCode: 200,
        body: { data: user_exists }, // TODO: add in implementation of resource
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
