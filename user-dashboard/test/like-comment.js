const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:8082/api/comment/like/6273dd651560255f6b5d1cd7/62513ed47594636f240b09d1",
      {
        data: {
          content: "<p>Good!!!</p>",
          created_at: "2022-05-05T14:21:25.182Z",
          deleted_at: null,
          film: "6268225e779e3f98dd7fd235",
          meta: { liked_by: ["62513ed47594636f240b09d1"] },
          liked_by: ["62513ed47594636f240b09d1"],
          updated_at: "2022-05-05T14:44:39.917Z",
          user: "62513ed47594636f240b09d1",
          _id: "6273dd651560255f6b5d1cd7",
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
