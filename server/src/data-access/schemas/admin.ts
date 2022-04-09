import mongoose from "mongoose";

const Schema = mongoose.Schema;
import { hashPassword } from "../../config/password";

const adminSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  hash_password: { type: String, trim: true },
  avatar_url: { type: String, trim: true },
  type: {
    type: String,
    required: true,
    default: "normal",
    trim: true,
    lowercase: true,
  },
  email: { type: String, trim: true, lowercase: true },
  phone_number: { type: Number },
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

/**
 * works when you create a new admin
 */
adminSchema.pre("save", async function (this: any, next) {
  const admin = this as any;

  admin.hash_password = await hashPassword({
    password: admin.hash_password,
    password_confirmation: admin.hash_password,
  });

  next();
});

export default adminSchema;
