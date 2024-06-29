import  * as mongoose from "mongoose";
import { model } from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  restaurant_id: { type: mongoose.Types.ObjectId, ref: "restaurant" },
  status: { type: String, required: false },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

export default model("banner", bannerSchema);
