const axios = require("axios");

module.exports = {
  request: () => {
    return axios.post(
      "http://localhost:3000/admin/film/create-film",
      {
        data: {
          title: "phim 123",
          categories: ["vietnam"],
          description: "description",
          meta: {
            actors: "Tom",
            age_limit: "18",
            countries: ["vn"],
            director: "James",
            languages: ["vn"],
            manufactured_at: "2022-05-04",
            released_at: "2022-05-04",
            quality: "2022-05-04",
            quality: "4k",
            status: "available",
            studio: "test",
            tags: ["horror"],
            series: "626e5752277558ae2b5eee64",
          },
        },
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXRyYW5zczFhQGdtYWlsLmNvbSIsImlhdCI6MTY1MTMyODE2MCwiZXhwIjoxNjgyODg1NzYwfQ.08UYkX5r3mRvFBCYubCbgGuQVEVCcBa76YRlNBdEtkg",
        },
      }
    );
  },
};
