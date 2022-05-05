const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:3000/api/user/",
      {
        birthday: "2022-05-05",
        created_at: "2022-04-09T07:39:07.190Z",
        email: "huytran@gmail.com",
        email_verified_at: null,
        first_name: "Huy",
        hash_password:
          "$2b$10$JSzUYolIlucGCPzQAYlfcOVZvIdv/CrvxyRih18GCUdCFpyzDjQJW",
        last_name: "Tran",
        phone_number: "1212121212",
        updated_at: "2022-05-03T16:28:19.916Z",
        _id: "62513ed47594636f240b09d1",
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
