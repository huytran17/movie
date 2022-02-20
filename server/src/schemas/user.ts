import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  hash_password: { type: String, trim: true },
  avatar: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone_number: { type: Number },
  country_code: { type: String, trim: true },
  language_code: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default userSchema;
