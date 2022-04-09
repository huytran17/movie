import { AdminDb } from "../../data-access";

import makeCreateAdmin from "./create-admin";
import makeUpdateAdmin from "./update-admin";
import makeGetAdminById from "./get-admin-by-id";
import makeRemoveAdminById from "./delete-admin-by-id";
import makeGetAdmins from "./get-admins";
import makeGetAdminByEmail from "./get-admin-by-email";

const getAdminByEmail = makeGetAdminByEmail(AdminDb);
const createAdmin = makeCreateAdmin(AdminDb);
const updateAdmin = makeUpdateAdmin(AdminDb);
const removeAdminById = makeRemoveAdminById(AdminDb);

/**
 * get admin by _id
 * @function getAdminById
 */
const getAdminById = makeGetAdminById(AdminDb);

/**
 * used by admin dashboard to get admins
 * TODO: this logic to get admins is flawed. It should be server side search
 */
const getAdmins = makeGetAdmins(AdminDb);

const adminServices = Object.freeze({
  createAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
  removeAdminById,
  getAdminByEmail,
});

export default adminServices;
export {
  createAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
  removeAdminById,
  getAdminByEmail,
};
