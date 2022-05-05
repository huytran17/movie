const { request } = require("./create-admin");

test("create-admin", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
