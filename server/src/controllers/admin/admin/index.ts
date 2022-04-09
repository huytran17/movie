import mongoose from "mongoose";

import {
  createAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
  removeAdminById,
} from "../../../use-cases/admin";
import { getUserByEmail, createUser } from "../../../use-cases/user";
import { verifyPassword, hashPassword } from "../../../config/password";

import makeGetAdminController from "./get-admin-by-id";
import makeUpdateAdminController from "./update-admin";
import makeUploadAdminAvatarController from "./upload-admin-avatar";
import makeGetAdminsController from "./get-admins";
import makeDeleteAdminController from "./delete-admin";
import makeCreateUserController from "./create-user";

const createUserController = makeCreateUserController({
  getUserByEmail,
  createUser,
  hashPassword,
});
const deleteAdminController = makeDeleteAdminController({
  deleteAdminById: removeAdminById,
});
/**
 * @description update admin's details excluding password
 */
const getAdminsController = makeGetAdminsController({ getAdmins });
/**
 * @description update admin's details excluding password
 */
const uploadAdminThumbnailController = makeUploadAdminAvatarController({
  updateAdmin,
  getAdminById,
  mongoose,
});
/**
 * @description update admin's details excluding password
 */
const updateAdminController = makeUpdateAdminController({
  updateAdmin,
  getAdminById,
  mongoose,
});
/**
 * get admin controller based on id
 * @function getAdminController
 */
const getAdminController = makeGetAdminController({
  getAdminById,
});

export default Object.freeze({
  getAdminController,
  updateAdminController,
  uploadAdminThumbnailController,
  getAdminsController,
  deleteAdminController,
  createUserController,
});

export {
  getAdminController,
  updateAdminController,
  uploadAdminThumbnailController,
  getAdminsController,
  deleteAdminController,
  createUserController,
};
