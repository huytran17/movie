const createFilmRules = {
  title: "required|string",
  description: "required|string",
  categories: [
    "required",
    "in:comedy,horror,documentary,family,kid,vietnam,usuk,fiction,theater,action,thrilling,adventure,legend",
  ],
  meta: {
    manufactured_at: "required|date",
    released_at: "required|date",
  },
};

export default createFilmRules;
