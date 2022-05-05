const axios = require("axios");

module.exports = {
  request: () => {
    return axios.post("http://localhost:3000/api/auth/sign-in", {
      data: {
        email: "huytran@gmail.com",
        password: "qwer1234",
      },
    });
  },
};
