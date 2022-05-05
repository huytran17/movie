const { request } = require("./delete-comment");

test("delete-comment", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
