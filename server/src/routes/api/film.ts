import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  getFilmBySlugRules,
  getFilmRules,
  updateFilmRules,
} from "../../controllers/api/film/validators";
import {
  getFilmController,
  getFilmBySlugController,
  getFilmsController,
  getFilmsPaginatedController,
  updateFilmController,
} from "../../controllers/api/film";

const filmRouter = express.Router();
filmRouter.put(
  "/:film_id",
  makeValidator(updateFilmRules),
  makeExpressCallback(updateFilmController)
);
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
