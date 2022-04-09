import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";
import {
  getAdminAnalyticsController,
  getFilmAnalyticsController,
  getUserAnalyticsController,
} from "../../controllers/admin/analytics";
import {
  getAdminAnalyticsRule,
  getUserAnalyticsRule,
  getFilmAnalyticsRule,
} from "../../controllers/admin/analytics/validator";

const analyticRouter = express.Router();

analyticRouter.get(
  "/user-analytics",
  makeValidator(getUserAnalyticsRule),
  makeExpressCallback(getUserAnalyticsController)
);

analyticRouter.get("/test", function (req, res) {
  res.send({ msf: "ddd" });
});

analyticRouter.get(
  "/film-analytics",
  makeValidator(getFilmAnalyticsRule),
  makeExpressCallback(getFilmAnalyticsController)
);

analyticRouter.get(
  "/admin-analytics",
  makeValidator(getAdminAnalyticsRule),
  makeExpressCallback(getAdminAnalyticsController)
);

export default analyticRouter;
