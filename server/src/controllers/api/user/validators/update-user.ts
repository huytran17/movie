const updateUserRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  first_name: ["string", "max: 120"],
  last_name: ["string", "max: 120"],
  email: "email",
  avatar_url: "string",
};
export default updateUserRules;
