import getUserRules from "./get-user";
import getUserBySlugRules from "./get-user-by-slug";
import getUserByUsernameRules from "./get-user-by-username";
import getUserByEmailRules from "./get-user-by-email";
import updateUserRules from "./update-user";
import uploadUserAvatarRules from "./upload-user-avatar";

export default Object.freeze({
  getUserRules,
  getUserBySlugRules,
  getUserByUsernameRules,
  getUserByEmailRules,
  updateUserRules,
  uploadUserAvatarRules,
});

export {
  getUserRules,
  getUserBySlugRules,
  getUserByUsernameRules,
  getUserByEmailRules,
  updateUserRules,
  uploadUserAvatarRules,
};
