import mongoose from "mongoose";
import userSchema from "../data-access/schemas/user";
import adminSchema from "../data-access/schemas/admin";
import filmSchema from "../data-access/schemas/film";
import commentSchema from "../data-access/schemas/comment";
import feedbackSchema from "../data-access/schemas/feedback";

import IUser from "../interfaces/user";
import IAdmin from "../interfaces/admin";
import IFilm from "../interfaces/film";
import IComment from "../interfaces/comment";
import IFeedback from "../interfaces/feedback";

type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;
type IFilmModel = IFilm & mongoose.Document;
type ICommentModel = IComment & mongoose.Document;
type IFeedbackModel = IFeedback & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);
const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);
const FilmModel = mongoose.model<IFilmModel>("Film", filmSchema);
const CommentModel = mongoose.model<ICommentModel>("Comment", commentSchema);
const FeedbackModel = mongoose.model<IFeedbackModel>(
  "Feedback",
  feedbackSchema
);

export default Object.freeze({
  UserModel,
  AdminModel,
  FilmModel,
  CommentModel,
  FeedbackModel,
});

export { UserModel, AdminModel, FilmModel, CommentModel, FeedbackModel };
