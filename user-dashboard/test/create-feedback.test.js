const { request } = require("./create-feedback");

test("create-feedback", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
