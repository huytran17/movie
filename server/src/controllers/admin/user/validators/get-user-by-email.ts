const getUserByEmailRules = {
  email: ["required", "email"],
  type: "string|in:mentee,mentor",
};

export default getUserByEmailRules;
