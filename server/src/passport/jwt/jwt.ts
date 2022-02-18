import passport from "passport";
import passport_jwt from "passport-jwt";
import options from "./setup";
import { UserDb } from "../../data-access";

const JWTStrategy = passport_jwt.Strategy;

passport.use(
  new JWTStrategy(options, async function (payload, done) {
    try {
      const user = await UserDb.findById({ id: payload.sub });

      return done(null, user);
    } catch (err) {
      throw new Error(err);
    }
  })
);
