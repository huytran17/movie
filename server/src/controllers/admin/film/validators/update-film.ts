const updateFilmRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: ["string", "max: 120"],
  description: ["string"],
  slug: "string",
  categories: [
    "required",
    "in:comedy,horror,documentary,family,kid,vietnam,usuk,fiction,theater,action,thrilling,adventure,legend,mentality,martial_arts",
  ],
};
export default updateFilmRules;
