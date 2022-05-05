const { request } = require("./update-admin");

test("update-admin", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
