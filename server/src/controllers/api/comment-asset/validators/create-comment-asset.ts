const createCommentAssetRules = {
  parent: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  children: ["required", "array"],
};

export default createCommentAssetRules;
