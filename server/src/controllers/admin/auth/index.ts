import moment from "moment";

import makeSignInController from "./sign-in";
import makeVerifyController from "./verify";
import makeAutoSignInController from "./auto-sign-in";
import makeGetAdminController from "./get-admin";
import makeLogoutController from "./logout";

import { getAdminByEmail } from "../../../use-cases/admin";
import { getAdminById } from "../../../use-cases/admin";

import { verifyPassword } from "../../../config/password";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../config/accessTokenManager";

const logoutController = makeLogoutController({
  getAdminByEmail,
});

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
  logoutController,
});

export {
  signInController,
  verifyController,
  autoSignInController,
  getAdminController,
  logoutController,
};
