const updateCommentRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  content: ["string", "max: 120"],
};
export default updateCommentRules;
