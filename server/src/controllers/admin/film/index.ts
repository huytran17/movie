import mongoose from "mongoose";

import {
  updateFilm,
  getFilmById,
  getFilmBySlug,
  getFilms,
  removeFilmById,
  createFilm,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";

import makeGetFilmBySlugController from "./get-film-by-slug";
import makeUpdateFilmController from "./update-film";
import makeUploadFilmAvatarController from "./upload-film-thumbnail";
import makeGetFilmsController from "./get-films";
import makeDeleteFilmController from "./delete-film";
import makeCreateFilmController from "./create-film";
import makeUploadFilmController from "./upload-film";
import makeUploadFilmTrailerController from "./upload-film-trailer";

const uploadFilmTrailerController = makeUploadFilmTrailerController({
  updateFilm,
  getFilmById,
  mongoose,
});

const uploadFilmController = makeUploadFilmController({
  getFilmById,
  updateFilm,
  mongoose,
});

const createFilmController = makeCreateFilmController({
  createFilm,
});

const deleteFilmController = makeDeleteFilmController({
  deleteFilmById: removeFilmById,
  getFilmById,
});
/**
 * @description update film's details excluding password
 */
const getFilmsController = makeGetFilmsController({ getFilms });
/**
 * @description update film's details excluding password
 */
const uploadFilmThumbnailController = makeUploadFilmAvatarController({
  updateFilm,
  getFilmById,
  mongoose,
});
/**
 * @description update film's details excluding password
 */
const updateFilmController = makeUpdateFilmController({
  updateFilm,
  getFilmById,
  mongoose,
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

export default Object.freeze({
  getFilmController,
  getFilmBySlugController,
  updateFilmController,
  uploadFilmThumbnailController,
  getFilmsController,
  deleteFilmController,
  createFilmController,
  uploadFilmController,
  uploadFilmTrailerController,
});

export {
  getFilmController,
  getFilmBySlugController,
  updateFilmController,
  uploadFilmThumbnailController,
  getFilmsController,
  deleteFilmController,
  createFilmController,
  uploadFilmController,
  uploadFilmTrailerController,
};
