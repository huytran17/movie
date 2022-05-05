const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:8080/admin/film/6273db431560255f6b5d1cbe",
      {
        data: {
          categories: ["vietnam"],
          created_at: "2022-05-05T14:12:19.664Z",
          deleted_at: null,
          description: "description",
          meta: {
            manufactured_at: "2022-05-04T00:00:00.000Z",
            released_at: "2022-05-04T00:00:00.000Z",
            view_count: 0,
          },
          title: "phim 123",
          updated_at: "2022-05-05T14:12:19.664Z",
          _id: "6273db431560255f6b5d1cbe",
        },
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXRyYW5AZ21haWwuY29tIiwiaWF0IjoxNjUxNTkyOTA5LCJleHAiOjE2ODMxNTA1MDl9.ZnnMrvjl0hGSTKcLsg158qCrdSWx3ROtdCiD7FoVmKo",
        },
      }
    );
  },
};
