const { request } = require("./update-feedback");

test("update-feedback", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
