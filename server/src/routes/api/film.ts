import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  getFilmBySlugRules,
  getFilmRules,
} from "../../controllers/api/film/validators";
import {
  getFilmController,
  getFilmBySlugController,
  getFilmsController,
  getFilmsPaginatedController,
} from "../../controllers/api/film";

const filmRouter = express.Router();

filmRouter.get(
  "/:film_id",
  makeValidator(getFilmRules),
  makeExpressCallback(getFilmController)
);

filmRouter.get("/", makeExpressCallback(getFilmsController));
filmRouter.get(
  "/films/all-paginated",
  makeExpressCallback(getFilmsPaginatedController)
);

filmRouter.get(
  "/:slug",
  makeValidator(getFilmBySlugRules),
  makeExpressCallback(getFilmBySlugController)
);

export default filmRouter;
