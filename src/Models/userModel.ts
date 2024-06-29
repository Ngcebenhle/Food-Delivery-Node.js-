import  * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, default: "" },
  email_verified: { type: Boolean, required: true, default: false },
  verification_token_opt: { type: String, required: true },
  verification_token_opt_timeout: { type: Date, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: false },
  reset_password_token_opt: { type: String, required: false },
  reset_password_token_opt_timeout: { type: Date, required: false },
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});


export default model("users", userSchema);
