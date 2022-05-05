const { request } = require("./delete-admin");

test("delete-admin", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
