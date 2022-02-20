import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";
import makeLoginUserController from "./login";

import { createUser, getUserByEmail } from "../../use-cases/user";

import { verifyPassword, hashPassword } from "../../config/password";
import { generateAccessToken } from "../../config/accessTokenManager";

const signUpController = makeSignUpController({
  hashPassword,
  createUser,
  getUserByEmail,
});

const loginController = makeLoginUserController({
  verifyPassword,
  generateAccessToken,
  getUserByEmail,
});

export default Object.freeze({
  signUpController,
  loginController,
});

export { signUpController, loginController };
