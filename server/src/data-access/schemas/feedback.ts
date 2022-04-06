import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true, trim: true },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  film: { type: Schema.Types.ObjectId, ref: "film" },
  star_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default commentSchema;
