import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  content: { type: String, trim: true },
  thumbnail_photo: { type: String, trim: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default postSchema;
