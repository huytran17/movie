const axios = require("axios");

module.exports = {
  request: () => {
    return axios.post(
      "http://localhost:3000/api/comment/create-comment/62513ed47594636f240b09d1/6268225e779e3f98dd7fd235",
      {
        data: {
          content: "Good",
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
