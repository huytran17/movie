const axios = require("axios");

module.exports = {
  request: () => {
    return axios.delete(
      "http://localhost:8082/api/comment/62713a5aa8e2a92d9a88a3d1",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXRyYW5AZ21haWwuY29tIiwiaWF0IjoxNjUxNTkyOTA5LCJleHAiOjE2ODMxNTA1MDl9.ZnnMrvjl0hGSTKcLsg158qCrdSWx3ROtdCiD7FoVmKo",
        },
        comment_id: "6273dd651560255f6b5d1cd7",
      }
    );
  },
};
