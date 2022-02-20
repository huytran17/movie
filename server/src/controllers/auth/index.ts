import moment from "moment";
import mongoose from "mongoose";

import makeSignUpController from "./sign-up";

import { createUser, getUserByEmail } from "../../use-cases/user";

import { verifyPassword, hashPassword } from "../../config/password";

const signUpUser = makeSignUpController({
  hashPassword,
  createUser,
  getUserByEmail,
});

export default Object.freeze({
  signUpUser,
});

export { signUpUser };
