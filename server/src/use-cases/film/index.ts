import { FilmDb } from "../../data-access";

import makeCreateFilm from "./create-film";
import makeUpdateFilm from "./update-film";
import makeRemoveFilm from "./delete-film";
import makeGetFilmById from "./get-film-by-id";
import makeRemoveFilmById from "./delete-film-by-id";
import makeGetFilmBySlug from "./get-film-by-slug";
import makeGetFilmBytitle from "./get-film-by-title";
import makeGetFilms from "./get-films";

const createFilm = makeCreateFilm(FilmDb);
const updateFilm = makeUpdateFilm(FilmDb);
const removeFilm = makeRemoveFilm(FilmDb);
const removeFilmById = makeRemoveFilmById(FilmDb);

/**
 * get film by _id
 * @function getFilmById
 */
const getFilmById = makeGetFilmById(FilmDb);

/**
 * get one film by slug
 * @function getFilmBySlug
 */
const getFilmBySlug = makeGetFilmBySlug(FilmDb);

/**
 * get one film by filmname
 * @function getFilmByTitle
 */
const getFilmByTitle = makeGetFilmBytitle(FilmDb);

/**
 * used by admin dashboard to get films
 * TODO: this logic to get films is flawed. It should be server side search
 */
const getFilms = makeGetFilms(FilmDb);

const filmServices = Object.freeze({
  createFilm,
  getFilmById,
  getFilmBySlug,
  getFilmByTitle,
  getFilms,
  updateFilm,
  removeFilm,
  removeFilmById,
});

export default filmServices;
export {
  createFilm,
  getFilmById,
  getFilmBySlug,
  getFilmByTitle,
  getFilms,
  updateFilm,
  removeFilm,
  removeFilmById,
};
