import jwt from "jsonwebtoken";

type IJwtGenerate = (
  payload: { [key: string]: any },
  secret: string,
  options?: { expiresIn: string | number },
) => string;

export default Object.freeze({
  generate: (
    payload: {
      [key: string]: any;
    },
    secret: string,
    options = {},
  ) => {
    return jwt.sign(payload, secret, options);
  },
  verify: jwt.verify,
});
export { IJwtGenerate };
