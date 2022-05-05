const { request } = require("./delete-user");

test("delete-user", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
