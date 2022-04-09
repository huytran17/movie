import passport from "../passport";

export default function authenticateUserJWT() {
  return passport.authenticate("admin-jwt", { session: false });
}
