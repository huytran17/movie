import mongoose from "mongoose";
import S3 from "../../config/storage";
import _ from "lodash";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  hash_password: { type: String, trim: true },
  aws: { type: Object },
  email: { type: String, trim: true, lowercase: true },
  phone_number: { type: Number },
  country_code: { type: String, trim: true },
  language_code: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  email_verified_at: { type: Date, default: null },
});

userSchema
  .virtual("full_name")
  .get(function (this: { first_name: string; last_name: string }) {
    return `${this.first_name} ${this.last_name}`;
  });

userSchema.virtual("alias_name").get(function (this: { full_name: string }) {
  const matches = this.full_name?.match(/\b(\w)/g); // ['J','S','O','N']

  const acronym = matches?.join(""); // JSON

  return acronym;
});

userSchema.virtual("avatar_url").get(function (this: any) {
  const user = this as any;

  const user_avatar_key = _.get(user, "aws.dirname", "");
  let user_avatar = "";
  if (user_avatar_key) {
    user_avatar = S3.getSignedUrl(user_avatar_key);
  }
  return user_avatar;
});

export default userSchema;
