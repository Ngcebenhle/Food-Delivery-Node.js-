import  * as mongoose from "mongoose";
import { model } from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  status: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

export default model("cities", citySchema);
