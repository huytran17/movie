const updateSeriesRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: ["string", "max: 120"],
};
export default updateSeriesRules;
