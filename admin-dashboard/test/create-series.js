const axios = require("axios");

module.exports = {
  request: () => {
    return axios.post(
      "http://localhost:3000/admin/series/create-series",
      {
        data: {
          title: "huytran@gmail.com",
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
