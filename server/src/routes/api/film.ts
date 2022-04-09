import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import {
  deleteFilmRules,
  getFilmBySlugRules,
  updateFilmRules,
  uploadFilmThumbnailRules,
  getFilmRules,
  createFilmRules,
} from "../../controllers/admin/film/validators";
import {
  getFilmController,
  getFilmBySlugController,
  updateFilmController,
  uploadFilmThumbnailController,
  getFilmsController,
  deleteFilmController,
  createFilmController,
} from "../../controllers/admin/film";

const filmRouter = express.Router();

filmRouter.get(
  "/:film_id",
  makeValidator(getFilmRules),
  makeExpressCallback(getFilmController)
);

filmRouter.get("/", makeExpressCallback(getFilmsController));

filmRouter.get(
  "/:slug",
  makeValidator(getFilmBySlugRules),
  makeExpressCallback(getFilmBySlugController)
);

export default filmRouter;
