import moment from "moment";
import makeUserDb from "./make-user-db";
import makeAdminDb from "./make-admin-db";
import makeFilmDb from "./make-film-db";
import makeCommentDb from "./make-comment-db";
import makeFeebackDb from "./make-feedback-db";
import makeSeriesDb from "./make-series-db";
import makeCommentAssetDb from "./make-comment-asset-db";

import {
  UserModel,
  AdminModel,
  FilmModel,
  CommentModel,
  FeedbackModel,
  SeriesModel,
  CommentAssetModel,
} from "../models";

const UserDb = makeUserDb({ userDbModel: UserModel, moment });
const CommentAssetDb = makeCommentAssetDb({
  commentAssetDbModel: CommentAssetModel,
  moment,
});
const AdminDb = makeAdminDb({ adminDbModel: AdminModel, moment });
const FilmDb = makeFilmDb({ filmDbModel: FilmModel, moment });
const CommentDb = makeCommentDb({ commentDbModel: CommentModel, moment });
const FeedbackDb = makeFeebackDb({ feedbackDbModel: FeedbackModel, moment });
const SeriesDb = makeSeriesDb({ seriesDbModel: SeriesModel, moment });

export default Object.freeze({
  UserDb,
  AdminDb,
  FilmDb,
  CommentDb,
  FeedbackDb,
  SeriesDb,
  CommentAssetDb,
});
export {
  UserDb,
  AdminDb,
  FilmDb,
  CommentDb,
  FeedbackDb,
  SeriesDb,
  CommentAssetDb,
};
