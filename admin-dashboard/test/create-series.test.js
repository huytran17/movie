const { request } = require("./create-series");

test("create-series", async () => {
  const res = await request();
  expect(res.data.is_error).toEqual(false);
});
