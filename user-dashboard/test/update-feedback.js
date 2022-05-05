const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:8082/api/feedback/6273e8cc885510a505f0efcf",
      {
        data: {
          content: "Good",
          star_count: 5,
          _id: "6273e8cc885510a505f0efcf",
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
