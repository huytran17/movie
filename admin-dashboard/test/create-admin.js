const axios = require("axios");

module.exports = {
  request: () => {
    return axios.post(
      "http://localhost:8080/admin/admin/create-admin",
      {
        data: {
          address:
            "http://localhost:8080/admin/admin/delete/6251200b9a55d5519467ac8a",
          birthday: "2022-05-26",
          email: "testforadmin123@gmail.com",
          first_name: "www",
          last_name: "www",
          password: "11111111",
          password_confirmation: "11111111",
          phone_number: "4343434343",
          type: "super",
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
