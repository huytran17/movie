import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "ok" });
});

export default userRouter;
