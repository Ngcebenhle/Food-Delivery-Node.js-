import  * as mongoose from "mongoose";
import { model } from "mongoose";

const categorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true},
  restaurant_id: { type: mongoose.Types.ObjectId, ref:'restaurant', required: true},
  name: { type: String, required: true, default: "" },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

export default model("categories", categorySchema);
