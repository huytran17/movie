const { request } = require("./delete-feedback");

test("delete-feedback", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
