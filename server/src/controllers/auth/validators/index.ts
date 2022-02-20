import signInRules from "./sign-in";
import signUpRules from "./sign-up";

const authValidators = Object.freeze({
  signInRules,
  signUpRules,
});

export default authValidators;

export { signInRules, signUpRules };
