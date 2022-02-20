import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";
import makeSignInUserController from "./sign-in";

import { createUser, getUserByEmail } from "../../use-cases/user";

import { verifyPassword, hashPassword } from "../../config/password";
import { generateAccessToken } from "../../config/accessTokenManager";

const signUpController = makeSignUpController({
  hashPassword,
  createUser,
  getUserByEmail,
});

const signInController = makeSignInUserController({
  verifyPassword,
  generateAccessToken,
  getUserByEmail,
});

export default Object.freeze({
  signUpController,
  signInController,
});

export { signUpController, signInController };
