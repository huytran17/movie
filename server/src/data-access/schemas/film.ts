import mongoose from "mongoose";

const Schema = mongoose.Schema;

const filmSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  aws: { type: Object },
  aws_thumnail: { type: Object },
  aws_trailer: { type: Object },
  categories: [
    {
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
  ],
  type: [
    {
      type: String,
      trim: true,
      enum: ["series", "odd"],
      default: "odd",
    },
  ],
  series: { type: Schema.Types.ObjectId, ref: "Series" },
  meta: {
    manufactured_at: { type: Date, default: null },
    released_at: { type: Date, default: null },
    view_count: { type: Number, trim: true, default: 0 },
    director: { type: String, trim: true, default: "" },
    actors: [{ type: String }],
    duration: {
      hour: { type: String, trim: true, default: "0" },
      minute: { type: String, trim: true, default: "0" },
    },
    countries: [{ type: String, trim: true }],
    rating: { type: String, trim: true, default: "" },
    languages: [{ type: String, trim: true }],
    studio: { type: String, trim: true, default: "" },
    status: {
      type: String,
      trim: true,
      enum: ["available", "blocked", "updating"],
      default: "blocked",
    },
    quality: {
      type: String,
      trim: true,
      enum: ["4k", "full hd", "hd", "low"],
      default: "full hd",
    },
    tags: [{ type: String }],
    age_limit: { type: Number, default: 18 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default filmSchema;
