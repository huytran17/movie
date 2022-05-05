const axios = require("axios");

module.exports = {
  request: () => {
    return axios.put(
      "http://localhost:8080/admin/admin/6251200b9a55d5519467ac8a",
      {
        address: "Unit test quản trị viên",
        aws_avatar: {
          mime_type: "image/jpeg",
          dirname: "upload/1650557654537-NWH-poster-1-game4v-1637893169-6.jpg",
        },
        created_at: "2022-04-09T05:56:27.909Z",
        deleted_at: "2022-05-05T15:23:44.263Z",
        email: "huytran@gmail.com",
        first_name: "Huy",
        hash_password:
          "$2b$10$upMe6pu1R4UoG9ZjtN6GmOrgyBHQrbtcKTa8eVtJFNtlHipAgSgxi",
        last_name: "Tran",
        phone_number: "1212121221",
        type: "super",
        updated_at: "2022-04-22T17:24:08.214Z",
        _id: "6251200b9a55d5519467ac8a",
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
