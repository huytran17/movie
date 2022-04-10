import express from "express";
import makeValidator from "../../middlewares/validator-middleware";
import makeExpressCallback from "../../express-callback";

import { deleteFeedbackRules } from "../../controllers/admin/feedback/validators";
import {
  getFeedbacksController,
  deleteFeedbackController,
} from "../../controllers/admin/feedback";

const feedbackRouter = express.Router();

feedbackRouter.get("/", makeExpressCallback(getFeedbacksController));

feedbackRouter.delete(
  "/delete/:feedback_id",
  makeValidator(deleteFeedbackRules),
  makeExpressCallback(deleteFeedbackController)
);

export default feedbackRouter;
