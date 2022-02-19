import passport from "passport";

export default function authenticateJWT() {
  return passport.authenticate("jwt", { session: false });
}
