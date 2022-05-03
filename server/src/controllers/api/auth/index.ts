import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";
import makeSignInController from "./sign-in";
import makeVerifyController from "./verify";
import makeAutoSignInController from "./auto-sign-in";
import makeGetUserController from "./get-user";
import makeUpdatePasswordController from "./update-password";
import makeLogoutController from "./logout";

import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../../../use-cases/user";

import { verifyPassword, hashPassword } from "../../../config/password";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../config/accessTokenManager";

const logoutController = makeLogoutController({
  getUserByEmail,
});
const updatePasswordController = makeUpdatePasswordController({
  updateUser,
  getUserById,
  verifyPassword,
  hashPassword,
  mongoose,
});

const getUserController = makeGetUserController({
  getUserById,
  moment,
});

const signUpController = makeSignUpController({
  hashPassword,
  createUser,
  getUserByEmail,
});

const signInController = makeSignInController({
  verifyPassword,
  generateAccessToken,
  getUserByEmail,
});

const verifyController = makeVerifyController();

const autoSignInController = makeAutoSignInController({
  getUserByEmail,
  verifyAccessToken,
});

export default Object.freeze({
  signUpController,
  signInController,
  verifyController,
  autoSignInController,
  getUserController,
  updatePasswordController,
  logoutController,
});

export {
  signUpController,
  signInController,
  verifyController,
  autoSignInController,
  getUserController,
  updatePasswordController,
  logoutController,
};
