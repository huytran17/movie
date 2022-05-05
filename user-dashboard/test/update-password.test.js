const { request } = require("./update-password");

test("update-password", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
