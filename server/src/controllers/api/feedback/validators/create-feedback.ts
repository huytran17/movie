const createFeedbackRules = {
  content: "required|string",
  user: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  film: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createFeedbackRules;
