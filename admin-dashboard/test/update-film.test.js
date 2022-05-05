const { request } = require("./update-film");

test("update-film", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
