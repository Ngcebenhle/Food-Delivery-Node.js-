import  * as mongoose from "mongoose";
import { model } from "mongoose";

const itemSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Types.ObjectId, ref:'restaurant', required: true},
  category_id: { type: mongoose.Types.ObjectId, ref:'category', required: true},
  name: { type: String, required: true, default: "" },
  description: { type: String },
  itemImage: { type: String, require: true },
  price: { type: Number, required: true },
  veg: { type: Boolean, required: true},
  status: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

export default model("item", itemSchema);
