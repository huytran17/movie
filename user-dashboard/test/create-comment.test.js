const { request } = require("./create-comment");

test("create-comment", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
