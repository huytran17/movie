import passport_jwt from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const ExtractJwt = passport_jwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_JWT_SECRET_OR_KEY,
};

export default options;
