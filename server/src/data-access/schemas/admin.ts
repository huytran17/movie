import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  hash_password: { type: String, trim: true },
  birthday: { type: Date, default: null },
  aws_avatar: { type: Object },
  type: {
    type: String,
    required: true,
    default: "normal",
    trim: true,
    lowercase: true,
  },
  email: { type: String, trim: true, lowercase: true },
  phone_number: { type: String, trim: true },
  address: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

adminSchema
  .virtual("full_name")
  .get(function (this: { first_name: string; last_name: string }) {
    return `${this.first_name} ${this.last_name}`;
  });

export default adminSchema;
