const { request } = require("./delete-film");

test("delete-film", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
