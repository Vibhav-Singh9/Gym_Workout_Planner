import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  caloriesPer100g: {
    type: Number,
    required: true
  },

  proteinPer100g: {
    type: Number,
    required: true
  },

  carbsPer100g: {
    type: Number,
    required: true
  },
  
  fatsPer100g: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Food", foodSchema);
