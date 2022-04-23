const createUserRules = {
  email: "required|email",
  password: "required|string|min:8|confirmed",
  password_confirmation: "required|string|min:8",
};

export default createUserRules;
