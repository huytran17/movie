import {
  getFilmById,
  getFilmBySlug,
  getFilmByName,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";

import makeGetFilmBySlugController from "./get-film-by-slug";
import makeGetFilmByNameController from "./get-film-by-name";

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
 * @function getFilmByNameController
 */
const getFilmByNameController = makeGetFilmByNameController({
  getFilmByName,
});

export default Object.freeze({
  getFilmController,
  getFilmBySlugController,
  getFilmByNameController,
});

export { getFilmController, getFilmBySlugController, getFilmByNameController };
