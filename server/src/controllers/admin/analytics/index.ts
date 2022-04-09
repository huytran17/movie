import moment from "moment";
import {
  getAdminAnalytics,
  getFilmAnalytics,
  getUserAnalytics,
} from "../../../use-cases/analytics";
import makeGetAdminAnalyticsController from "./get-admin-analytics";
import makeGetFilmAnalyticsController from "./get-film-analytics";
import makeGetUserAnalyticsController from "./get-user-analytics";

/**
 * @description analytic user creation
 */

const getAdminAnalyticsController = makeGetAdminAnalyticsController({
  getAdminAnalytics,
});

/**
 * @description analytic total cumulative user
 */

const getFilmAnalyticsController = makeGetFilmAnalyticsController({
  getFilmAnalytics,
});

/**
 * @description analytic accumulated user
 */

const getUserAnalyticsController = makeGetUserAnalyticsController({
  getUserAnalytics,
});

const analyticControlller = Object.freeze({
  getAdminAnalyticsController,
  getFilmAnalyticsController,
  getUserAnalyticsController,
});

export default analyticControlller;
export {
  getAdminAnalyticsController,
  getFilmAnalyticsController,
  getUserAnalyticsController,
};
