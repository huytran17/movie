const createFilmRules = {
  title: "required|string",
  description: "required|string",
  categories: [
    "required",
    "in:comedy,criminal,horror,documentary,family,kid,vietnam,usuk,affection,school,fiction,theater,action,thrilling,adventure,legend,cartoon,mentality,martial_arts",
  ],
  meta: {
    manufactured_at: "required|date",
    released_at: "required|date",
  },
};

export default createFilmRules;
