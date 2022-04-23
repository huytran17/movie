const updatePasswordRules = {
  user_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  old_password: "required|min:8",
  password: "required|min:8|confirmed",
  password_confirmation: "required|min:8",
};
export default updatePasswordRules;
