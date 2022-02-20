import makeGenerateAccessToken from "./generate-access-token";
import accessToken from "./accessToken";

const secret = process.env.AUTH_SECRET || "kinobi_secret";

const generateAccessToken = makeGenerateAccessToken({
  generate: accessToken.generate,
  secret,
});

export default Object.freeze({
  generateAccessToken,
});
export { generateAccessToken };
