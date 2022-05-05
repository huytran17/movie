const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:8082/api/comment/6273dd651560255f6b5d1cd7",
      {
        data: {
          content: "<p>Good!!!</p>",
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
