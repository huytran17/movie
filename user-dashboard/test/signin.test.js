const { request } = require("./signin");

test("signin", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
