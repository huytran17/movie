const axios = require("axios");

module.exports = {
  request: () => {
    return axios.delete(
      "http://localhost:8080/admin/admin/delete/6251200b9a55d5519467ac8a",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXRyYW5zczFhQGdtYWlsLmNvbSIsImlhdCI6MTY1MTMyODE2MCwiZXhwIjoxNjgyODg1NzYwfQ.08UYkX5r3mRvFBCYubCbgGuQVEVCcBa76YRlNBdEtkg",
        },
      }
    );
  },
};
