const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:3000/api/auth/security/62513ed47594636f240b09d1",
      {
        data: {
          old_password: "qwer1234",
          password: "qwer1234",
          password_confirmation: "qwer1234",
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
