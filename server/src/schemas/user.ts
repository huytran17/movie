import mongoose from "mongoose";
import _ from "lodash";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, trim: true, required: true },
  last_name: { type: String, trim: true, required: true },
  hash_password: { type: String, trim: true },
  avatar: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone_number: { type: Number },
  country_code: { type: String, trim: true },
  language_code: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  email_verified_at: { type: Date, default: null },
});

userSchema.virtual("full_name").get(() => {
  const user = this as any;
  const first_name = _.get(user, "first_name", "");
  const last_name = _.get(user, "last_name", "");
  const fullname = `${first_name} ${last_name}`;

  return fullname;
});

userSchema.virtual("alias_name").get(() => {
  const user = this as any;
  const { full_name } = user;
  const matches = full_name.match(/\b(\w)/g); // ['J','S','O','N']
  const acronym = matches.join(""); // JSON

  return acronym;
});

export default userSchema;
