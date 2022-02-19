import { PassportStatic } from "passport";
import passport_jwt from "passport-jwt";
import options from "./setup";
import { UserDb } from "../../data-access";

interface IInitializeJWTData {
  passport: PassportStatic;
}

export default function initializeJWT({
  passport,
}: IInitializeJWTData): PassportStatic {
  const JWTStrategy = passport_jwt.Strategy;

  passport.use(
    "jwt",
    new JWTStrategy(options, async function (payload, done) {
      try {
        const user = await UserDb.findById({ id: payload.sub });

        if (!user) {
          return done(null, null);
        }

        return done(null, user);
      } catch (err) {
        throw new Error(err);
      }
    })
  );

  return passport;
}
