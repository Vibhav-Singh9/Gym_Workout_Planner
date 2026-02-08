import Food from "../models/food.model.js";

export const addFood = async (req, res) => {
  try {
    const {
      name,
      caloriesPer100g,
      proteinPer100g,
      carbsPer100g,
      fatsPer100g
    } = req.body;

    if (!name || !caloriesPer100g) {
      return res.status(400).json({
        success: false,
        message: "Food name and calories are required"
      });
    }

    const food = await Food.create({
      name,
      caloriesPer100g,
      proteinPer100g,
      carbsPer100g,
      fatsPer100g
    });

    return res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: food
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Food already exists or invalid data"
    });
  }
};
