import { Request } from "express";
import * as _ from "lodash";
import Feedback from "../../../entities/feedback";

import { ICreateFeedback } from "../../../use-cases/feedback/create-feedback";
import { IUpdateFilm } from "../../../use-cases/film/update-film";
import { IGetFilmById } from "../../../use-cases/film/get-film-by-id";
import { IGetFeedbacksByFilmId } from "../../../use-cases/feedback/get-feedbacks-by-film-id";

export default function makeCreateFeedbackController({
  createFeedback,
  updateFilm,
  getFilmById,
  getFeedbacksByFilmId,
}: {
  createFeedback: ICreateFeedback;
  updateFilm: IUpdateFilm;
  getFilmById: IGetFilmById;
  getFeedbacksByFilmId: IGetFeedbacksByFilmId;
}) {
  return async function createFeedbackController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const feedbackDetails: Feedback = _.get(
        httpRequest,
        "context.validated.data"
      );

      const { user, film } = _.get(httpRequest, "context.validated");

      const film_exists = await getFilmById({ id: film });
      if (!film_exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: "Film does not exists.",
          },
        };
      }

      const final_feedback_details = Object.assign({}, feedbackDetails, {
        user,
        film,
      });

      const created_feedback = await createFeedback({
        feedbackDetails: final_feedback_details,
      });

      const film_rating = _.get(film_exists, "meta.rating", 0);
      const film_rating_number = Number(film_rating);
      const valid_film_rating = !_.isNaN(film_rating_number);

      if (valid_film_rating) {
        const feedbacks = await getFeedbacksByFilmId({ film_id: film });
        const total_star = _.sumBy(
          feedbacks,
          (feedback) => feedback.star_count
        );
        const new_total_star =
          total_star + _.get(created_feedback, "star_count", 0);
        const average_total_star =
          new_total_star / _.get(feedbacks, "length", 1);

        const film_details = Object.assign({}, film_exists, {
          "meta.rating": average_total_star.toString(),
        });

        await updateFilm({ filmDetails: film_details });
      }

      return {
        headers,
        statusCode: 201,
        body: {
          data: created_feedback,
        },
      };
    } catch (err) {
      // TODO: add in error handling here
      return {
        headers,
        statusCode: 201,
        body: {
          error: err.message,
        },
      };
    }
  };
}
