const { request } = require("./update-profile");

test("update-profile", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
