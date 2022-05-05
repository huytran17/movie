const { request } = require("./update-comment");

test("update-comment", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
