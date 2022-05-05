const { request } = require("./create-film");

test("create-film", async () => {
  const res = await request();
  expect(res.data.is_error).toBeUndefined();
});
