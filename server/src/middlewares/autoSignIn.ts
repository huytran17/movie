import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { verifyAccessToken } from "../config/accessTokenManager";
import { UserDb } from "../data-access";

export default function makeAutoSignIn() {
  return async function autoSignIn(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.set({
      "Content-Type": "application/json",
    });
    res.type("json");
    res.status(200);

    const headers = _.get(req, "headers");
    const bearer_token = _.get(headers, "authorization", "");
    const access_token = bearer_token.slice(7);
    const decoded = await verifyAccessToken(access_token);

    if (!decoded) {
      res.json({
        body: {
          is_error: true,
          message: "Invalid access token.",
        },
      });

      return;
    }

    const email: string = _.get(decoded, "email", "");
    const user = await UserDb.findByEmail({ email });

    if (!user) {
      res.json({
        body: {
          is_error: true,
          message: "User does not exists.",
        },
      });

      return;
    }

    req.user = user;

    next();
  };
}
