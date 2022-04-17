const createFilmRules = {
  title: "required|string",
  description: "required|string",
  url: "required|string",
  category: [
    "required",
    "in:comedy,horror,documentary,family,kid,vietnam,usuk",
  ],
  meta: {
    manufactured_at: "required|date",
    released_at: "required|date",
  },
};

export default createFilmRules;
