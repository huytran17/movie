import { UserDb } from "../../data-access";

import makeCreateUser from "./create-user";
import makeGetUserByEmail from "./get-user-by-email";

const createUser = makeCreateUser(UserDb);
const getUserByEmail = makeGetUserByEmail(UserDb);

export default Object.freeze({
  createUser,
  getUserByEmail,
});

export { createUser, getUserByEmail };
