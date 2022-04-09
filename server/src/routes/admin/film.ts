import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

// import { getFilmRules } from "../../controllers/admin/film/validators";
// import { getFilmController } from "../../controllers/admin/film";

const filmRouter = express.Router();

// filmRouter.get(
//   "/:film_id",
//   makeValidator(getFilmRules),
//   makeExpressCallback(getFilmController)
// );

export default filmRouter;
