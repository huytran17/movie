const { request } = require("./like-comment");

test("like-comment", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
