import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: { type: String, required: true, trim: true },
  aws_thumbnail: { type: Object },
  film: { type: Schema.Types.ObjectId, ref: "Film" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default seriesSchema;
