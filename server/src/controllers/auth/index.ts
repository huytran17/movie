import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";
import makeSignInController from "./sign-in";
import makeVerifyController from "./verify";
import makeAutoSignInController from "./auto-sign-in";

import { createUser, getUserByEmail } from "../../use-cases/user";

import { verifyPassword, hashPassword } from "../../config/password";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../config/accessTokenManager";

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
});

export {
  signUpController,
  signInController,
  verifyController,
  autoSignInController,
};
