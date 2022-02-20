import loginRules from "./login";
import signUpRules from "./login";

const authValidators = Object.freeze({
  loginRules,
  signUpRules,
});

export default authValidators;

export { loginRules, signUpRules };
