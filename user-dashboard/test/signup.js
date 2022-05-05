const axios = require("axios");

module.exports = {
  request: () => {
    return axios.post("http://localhost:3000/api/auth/sign-up", {
      data: {
        email: "huytran12345678910@gmail.com",
        password: "11111111",
        password_confirmation: "11111111",
      },
    });
  },
};
