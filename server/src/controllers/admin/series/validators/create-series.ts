const createSeriesRules = {
  title: ["string", "max: 120"],
  film: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createSeriesRules;
