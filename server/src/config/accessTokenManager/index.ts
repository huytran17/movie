import makeGenerateAccessToken from "./generate-access-token";
import accessToken from "./accessToken";

const secret = process.env.PASSPORT_JWT_SECRET || "socialite";

const generateAccessToken = makeGenerateAccessToken({
  generate: accessToken.generate,
  secret,
});

export default Object.freeze({
  generateAccessToken,
});
export { generateAccessToken };
