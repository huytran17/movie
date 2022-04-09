import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteFilmRules,
  getFilmBySlugRules,
  updateFilmRules,
  uploadFilmThumbnailRules,
  getFilmRules,
} from "../../controllers/admin/film/validators";
import {
  getFilmController,
  getFilmBySlugController,
  updateFilmController,
  uploadFilmThumbnailController,
  getFilmsController,
  deleteFilmController,
} from "../../controllers/admin/film";

const filmRouter = express.Router();

filmRouter.get(
  "/:film_id",
  makeValidator(getFilmRules),
  makeExpressCallback(getFilmController)
);

filmRouter.put(
  "/:film_id",
  makeValidator(updateFilmRules),
  makeExpressCallback(updateFilmController)
);

filmRouter.get("/", makeExpressCallback(getFilmsController));

filmRouter.delete(
  "/:film_id",
  makeValidator(deleteFilmRules),
  makeExpressCallback(deleteFilmController)
);

filmRouter.get(
  "/:slug",
  makeValidator(getFilmBySlugRules),
  makeExpressCallback(getFilmBySlugController)
);

export default filmRouter;
