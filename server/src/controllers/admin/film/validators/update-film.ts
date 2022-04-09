const updateFilmRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: ["string", "max: 120"],
  description: ["string", "max: 120"],
  url: "string",
  slug: "string",
  thumbnail_url: "string",
};
export default updateFilmRules;
