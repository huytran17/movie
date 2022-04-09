import getUserAnalyticsRule from "./get-user-analytics";
import getAdminAnalyticsRule from "./get-admin-analytics";
import getFilmAnalyticsRule from "./get-film-analytics";

const analyticValidator = Object.freeze({
  getUserAnalyticsRule,
  getAdminAnalyticsRule,
  getFilmAnalyticsRule,
});

export default analyticValidator;
export { getUserAnalyticsRule, getAdminAnalyticsRule, getFilmAnalyticsRule };
