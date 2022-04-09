import mongoose from "mongoose";

import {
  getUserById,
  getUserByEmail,
  getUserBySlug,
  getUserByUsername,
  updateUser,
} from "../../../use-cases/user";
import makeGetUserController from "./get-user";

import makeGetUserBySlugController from "./get-user-by-slug";
import makeGetUserByUsernameController from "./get-user-by-username";
import makeGetUserByEmailController from "./get-user-by-email";
import makeUpdateUserController from "./update-user";
import makeUploadUserAvatarController from "./upload-user-avatar";

/**
 * @description update user's details excluding password
 */
const uploadUserAvatarController = makeUploadUserAvatarController({
  updateUser,
  getUserById,
  mongoose,
});
/**
 * @description update user's details excluding password
 */
const updateUserController = makeUpdateUserController({
  updateUser,
  getUserById,
  mongoose,
});
/**
 * get user controller based on id
 * @function getUserController
 */
const getUserController = makeGetUserController({
  getUserById,
});

/**
 * get user by slug
 * @function getUserBySlugController
 */
const getUserBySlugController = makeGetUserBySlugController({
  getUserById,
  getUserBySlug,
});

/**
 * get user by username
 * @function getUserByUsernameController
 */
const getUserByUsernameController = makeGetUserByUsernameController({
  getUserByUsername,
});

/**
 * get user by email
 * @function getUserByEmailController
 */
const getUserByEmailController = makeGetUserByEmailController({
  getUserByEmail,
});

export default Object.freeze({
  getUserController,
  getUserBySlugController,
  getUserByUsernameController,
  getUserByEmailController,
  updateUserController,
  uploadUserAvatarController,
});

export {
  getUserController,
  getUserBySlugController,
  getUserByUsernameController,
  getUserByEmailController,
  updateUserController,
  uploadUserAvatarController,
};
