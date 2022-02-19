import { Request, Response, NextFunction } from "express";
import _ from "lodash";

// FIXME: fix all the any
type IController = (httpRequest: any) => any;
export default function makeExpressCallback(controller: IController) {
  return (
    req: Request & { clientIp: string },
    res: Response,
    next: NextFunction
  ) => {
    const httpRequest = {
      context: {
        validated: Object.assign({}, req.body, req.params, req.query),
        user: req.user,
        file: req.file,
        files: req.files,
      },
      query: req.query,
      params: req.params,
      ip: req.clientIp,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    controller(httpRequest)
      .then((httpResponse: any) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((errorObject) => {
        res.status(errorObject.statusCode).send(errorObject.body);
        next(errorObject);
      });
  };
}
