import mongoose from "mongoose";

import {
  updateFilm,
  getFilmById,
  getFilmBySlug,
  getFilmsPaginated,
  removeFilmById,
  createFilm,
} from "../../../use-cases/film";
import makeGetFilmController from "./get-film";

import makeGetFilmBySlugController from "./get-film-by-slug";
import makeUpdateFilmController from "./update-film";
import makeUploadFilmThumbnailController from "./upload-film-thumbnail";
import makeGetFilmsPaginatedController from "./get-films-paginated";
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
const getFilmsPaginatedController = makeGetFilmsPaginatedController({
  getFilmsPaginated,
});
/**
 * @description update film's details excluding password
 */
const uploadFilmThumbnailController = makeUploadFilmThumbnailController({
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
  getFilmsPaginatedController,
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
  getFilmsPaginatedController,
  deleteFilmController,
  createFilmController,
  uploadFilmController,
  uploadFilmTrailerController,
};
