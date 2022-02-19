import passport from "passport";
import initializeJWT from "./jwt";

initializeJWT({ passport });

export default passport;
