import { Request } from "express";
import * as _ from "lodash";
import { Mongoose } from "mongoose";
import { IGetFilmById } from "../../../use-cases/film/get-film-by-id";
import { IUpdateFilm } from "../../../use-cases/film/update-film";

export default function makeUploadFilmController({
  getFilmById,
  updateFilm,
  mongoose,
}: {
  getFilmById: IGetFilmById;
  updateFilm: IUpdateFilm;
  mongoose: Mongoose;
}) {
  return async function (
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { film_id }: { film_id: string } = _.get(
        httpRequest,
        "context.validated"
      );

      const exists = await getFilmById({ id: film_id });
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Film does not exists.`,
          },
        };
      }

      const file = _.get(httpRequest, "context.file");
      if (!file) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `File does not exists.`,
          },
        };
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

      const updated_film = Object.assign({}, exists, {
        aws: aws_payload,
      });

      const final_updated_film = await updateFilm({
        filmDetails: updated_film,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: final_updated_film,
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
