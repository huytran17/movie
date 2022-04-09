import moment from "moment";
import { UserDb } from "../../data-access";

import makeCreateUser from "./create-user";
import makeGetUserByEmail from "./get-user-by-email";
import makeUpdateUser from "./update-user";
import makeDeleteUser from "./delete-user";
import makeGetUserById from "./get-user-by-id";
import makeDeleteUserById from "./delete-user-by-id";
import makeGetUserBySlug from "./get-user-by-slug";
import makeGetUserByUsername from "./get-user-by-username";
import makeGetUsers from "./get-users";

const createUser = makeCreateUser(UserDb);
const updateUser = makeUpdateUser(UserDb);
const deleteUser = makeDeleteUser(UserDb);
const deleteUserById = makeDeleteUserById(UserDb);
const getUserByEmail = makeGetUserByEmail(UserDb);

/**
 * get user by _id
 * @function getUserById
 */
const getUserById = makeGetUserById(UserDb);

/**
 * get one user by slug
 * @function getUserBySlug
 */
const getUserBySlug = makeGetUserBySlug(UserDb);

/**
 * get one user by username
 * @function getUserByUsername
 */
const getUserByUsername = makeGetUserByUsername(UserDb);

/**
 * used by admin dashboard to get users
 * TODO: this logic to get users is flawed. It should be server side search
 */
const getUsers = makeGetUsers(UserDb);

const userServices = Object.freeze({
  createUser,
  getUserByEmail,
  getUserById,
  getUserBySlug,
  getUserByUsername,
  getUsers,
  updateUser,
  deleteUser,
  deleteUserById,
});

export default userServices;
export {
  createUser,
  getUserByEmail,
  getUserById,
  getUserBySlug,
  getUserByUsername,
  getUsers,
  updateUser,
  deleteUser,
  deleteUserById,
};
