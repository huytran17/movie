import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storySchema = new Schema({
  viewers: [{ type: Schema.Types.ObjectId, default: [] }],
  creator: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  expired_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default storySchema;
