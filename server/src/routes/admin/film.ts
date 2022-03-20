import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import { getFilmRules } from "../../controllers/api/film/validators";
import { getFilmController } from "../../controllers/api/film";

const filmRouter = express.Router();

filmRouter.get(
  "/:user_id",
  makeValidator(getFilmRules),
  makeExpressCallback(getFilmController)
);

export default filmRouter;
