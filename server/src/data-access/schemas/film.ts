import mongoose from "mongoose";

const Schema = mongoose.Schema;

const filmSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  aws: { type: Object },
  aws_thumnail: { type: Object },
  category: {
    type: String,
    trim: true,
    enum: [
      "comedy",
      "horror",
      "documentary",
      "family",
      "kid",
      "vietnam",
      "usuk",
    ],
    default: "vietnam",
  },
  meta: {
    manufactured_at: { type: Date, default: null },
    released_at: { type: Date, default: null },
    view_count: { type: Number, trim: true, default: 0 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default filmSchema;
