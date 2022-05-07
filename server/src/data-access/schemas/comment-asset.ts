import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentAssetSchema = new Schema({
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  film: { type: Schema.Types.ObjectId, ref: "Film" },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default commentAssetSchema;
