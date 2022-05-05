const { request } = require("./signup");

test("signup", async () => {
  const res = await request();
  expect(res.data.is_registered).toEqual(true);
});
