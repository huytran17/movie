import signInRules from "./sign-in";
import signUpRules from "./sign-up";
import updatePasswordRules from "./update-password";
import logoutRules from "./logout";

const authValidators = Object.freeze({
  signInRules,
  signUpRules,
  updatePasswordRules,
  logoutRules,
});

export default authValidators;

export { signInRules, signUpRules, updatePasswordRules, logoutRules };
