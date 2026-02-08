import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  totalWater: {
    type: Number, // in ml
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Water", waterSchema);
