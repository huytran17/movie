import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";
import makeSignInController from "./sign-in";
import makeVerifyController from "./verify";

import { createUser, getUserByEmail } from "../../use-cases/user";

import { verifyPassword, hashPassword } from "../../config/password";
import { generateAccessToken } from "../../config/accessTokenManager";

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

export default Object.freeze({
  signUpController,
  signInController,
  verifyController,
});

export { signUpController, signInController, verifyController };
