import {
  getFilmById,
  getFilmBySlug,
  getFilmByTitle,
  getFilms,
  getFilmsPaginated,
  updateFilm,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";
import mongoose from "mongoose";
import makeGetFilmBySlugController from "./get-film-by-slug";
import makeGetFilmByTitleController from "./get-film-by-title";
import makeGetFilmsController from "./get-films";
import makeGetFilmsPaginatedController from "./get-films-paginated";
import makeUpdateFilmController from "./update-film";

const updateFilmController = makeUpdateFilmController({
  updateFilm,
  getFilmById,
  mongoose,
});
/**
 * get film controller based on id
 * @function getFilmsController
 */
const getFilmsController = makeGetFilmsController({
  getFilms,
});
const getFilmsPaginatedController = makeGetFilmsPaginatedController({
  getFilmsPaginated,
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
  getFilmsPaginatedController,
  updateFilmController,
});

export {
  getFilmController,
  getFilmBySlugController,
  getFilmByTitleController,
  getFilmsController,
  getFilmsPaginatedController,
  updateFilmController,
};
