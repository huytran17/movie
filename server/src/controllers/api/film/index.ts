import {
  getUserById,
  getUserByEmail,
  getUserBySlug,
  getUserByUsername,
} from "../../use-cases/user";
import makeGetUserController from "./get-user";

import makeGetUserBySlugController from "./get-user-by-slug";
import makeGetUserByUsernameController from "./get-user-by-username";
import makeGetUserByEmailController from "./get-user-by-email";

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
});

export {
  getUserController,
  getUserBySlugController,
  getUserByUsernameController,
  getUserByEmailController,
};
