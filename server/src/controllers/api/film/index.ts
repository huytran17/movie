import {
  getFilmById,
  getFilmBySlug,
  getFilmByTitle,
  getFilms,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";

import makeGetFilmBySlugController from "./get-film-by-slug";
import makeGetFilmByTitleController from "./get-film-by-title";
import makeGetFilmsController from "./get-films";

/**
 * get film controller based on id
 * @function getFilmsController
 */
const getFilmsController = makeGetFilmsController({
  getFilms,
});

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
  getFilmsController,
});

export {
  getFilmController,
  getFilmBySlugController,
  getFilmByTitleController,
  getFilmsController,
};
