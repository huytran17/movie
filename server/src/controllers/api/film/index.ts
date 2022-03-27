import {
  getFilmById,
  getFilmBySlug,
  getFilmByTitle,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";

import makeGetFilmBySlugController from "./get-film-by-slug";
import makeGetFilmByTitleController from "./get-film-by-title";

/**
 * get film controller based on id
 * @function getFilmController
 */
const getFilmController = makeGetFilmController({
  getFilmById,
});

/**
 * get film by slug
 * @function getFilmBySlugController
 */
const getFilmBySlugController = makeGetFilmBySlugController({
  getFilmById,
  getFilmBySlug,
});

/**
 * get film by filmname
 * @function getFilmByTitleController
 */
const getFilmByTitleController = makeGetFilmByTitleController({
  getFilmByTitle,
});

export default Object.freeze({
  getFilmController,
  getFilmBySlugController,
  getFilmByTitleController,
});

export { getFilmController, getFilmBySlugController, getFilmByTitleController };
