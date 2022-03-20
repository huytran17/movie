import {
  getFilmById,
  getFilmBySlug,
  getFilmByFilmname,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";

import makeGetFilmBySlugController from "./get-film-by-slug";
import makeGetFilmByFilmnameController from "./get-film-by-name";

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
 * @function getFilmByFilmnameController
 */
const getFilmByFilmnameController = makeGetFilmByFilmnameController({
  getFilmByFilmname,
});

export default Object.freeze({
  getFilmController,
  getFilmBySlugController,
  getFilmByFilmnameController,
});

export {
  getFilmController,
  getFilmBySlugController,
  getFilmByFilmnameController,
};
