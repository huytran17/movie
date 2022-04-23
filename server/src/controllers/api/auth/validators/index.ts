import signInRules from "./sign-in";
import signUpRules from "./sign-up";
import updatePasswordRules from "./update-password";

const authValidators = Object.freeze({
  signInRules,
  signUpRules,
  updatePasswordRules,
});

export default authValidators;

export { signInRules, signUpRules, updatePasswordRules };
