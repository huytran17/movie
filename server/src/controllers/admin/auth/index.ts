import moment from "moment";
import mongoose from "mongoose";

import makeSignInController from "./sign-in";
import makeVerifyController from "./verify";
import makeAutoSignInController from "./auto-sign-in";
import makeGetAdminController from "./get-admin";

import { getAdminByEmail } from "../../../use-cases/admin";
import { getAdminById } from "../../../use-cases/admin";

import { verifyPassword } from "../../../config/password";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../config/accessTokenManager";

const getAdminController = makeGetAdminController({
  getAdminById,
  moment,
});

const signInController = makeSignInController({
  verifyPassword,
  generateAccessToken,
  getAdminByEmail,
});

const verifyController = makeVerifyController();

const autoSignInController = makeAutoSignInController({
  getAdminByEmail,
  verifyAccessToken,
});

export default Object.freeze({
  signInController,
  verifyController,
  autoSignInController,
  getAdminController,
});

export {
  signInController,
  verifyController,
  autoSignInController,
  getAdminController,
};
