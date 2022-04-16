import signInRules from "./sign-in";
import signUpRules from "./sign-up";
import logoutRules from "./logout";

const authValidators = Object.freeze({
  signInRules,
  signUpRules,
  logoutRules,
});

export default authValidators;

export { signInRules, signUpRules, logoutRules };
