import { FilmDb } from "../../data-access";
import { AdminDb } from "../../data-access";
import { UserDb } from "../../data-access";

import makeGetAdminAnalytics from "./get-admin-analytics";
import makeGetUserAnalytics from "./get-user-analytics";
import makeGetFilmAnalytics from "./get-film-analytics";

const getAdminAnalytics = makeGetAdminAnalytics({ adminDb: AdminDb });
const getFilmAnalytics = makeGetFilmAnalytics({ filmDb: FilmDb });
const getUserAnalytics = makeGetUserAnalytics({ userDb: UserDb });

const filmServices = Object.freeze({
  getAdminAnalytics,
  getFilmAnalytics,
  getUserAnalytics,
});

export default filmServices;
export { getAdminAnalytics, getFilmAnalytics, getUserAnalytics };
