import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";

import { createUser, getUserByEmail } from "../../use-cases/user";

import { verifyPassword, hashPassword } from "../../config/password";

const signUpController = makeSignUpController({
  hashPassword,
  createUser,
  getUserByEmail,
});

export default Object.freeze({
  signUpController,
});

export { signUpController };
