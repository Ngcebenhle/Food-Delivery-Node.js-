import  * as mongoose from "mongoose";
import { model } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  city_id: { type: mongoose.Types.ObjectId,ref: 'cities', required: true },
  name: { type: String, required: true, default: "" },
  short_name: { type: String, required: true },
  description: { type: String },
  cover_image: { type: String, require: true },
  open_time: { type: String, required: true },
  close_time: { type: String, required: true },
  price: { type: String, required: true },
  address: { type: String, required: true },
  delivery_time: { type: String, required: true },
  isClosed: { type: Boolean, required: true, default: false },
  location: { type: Object, required: true},
  cuisines: { type: Array, required: true },
  status: { type: String, required: true, default: "active" },
  rating: { type: Number, required: true, default: 0 },
  total_rating: { type: Number, required: true, default: 0 },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

// restaurantSchema.index({location:'2dsphere'}, {background: true});
export default model("restaurants", restaurantSchema);
