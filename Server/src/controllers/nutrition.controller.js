import Nutrition from "../models/nutrition.model.js";
import Food from "../models/food.model.js";

/**
 * ADD MEAL (DAY-WISE)
 */
export const addMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fats } = req.body;

    if (!name || !calories) {
      return res.status(400).json({
        success: false,
        message: "Meal name and calories are required"
      });
    }

    // Normalize date (today only)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nutrition = await Nutrition.findOne({
      userId: req.user._id,
      date: today
    });

    if (!nutrition) {
      nutrition = await Nutrition.create({
        userId: req.user._id,
        date: today,
        meals: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0
      });
    }

    const meal = { name, calories, protein, carbs, fats };

    nutrition.meals.push(meal);

    nutrition.totalCalories += calories;
    nutrition.totalProtein += protein || 0;
    nutrition.totalCarbs += carbs || 0;
    nutrition.totalFats += fats || 0;

    await nutrition.save();

    return res.status(201).json({
      success: true,
      message: "Meal added successfully",
      data: nutrition
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add meal"
    });
  }
};

/**
 * GET TODAY'S NUTRITION
 */
export const getTodayNutrition = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nutrition = await Nutrition.findOne({
      userId: req.user._id,
      date: today
    });

    return res.status(200).json({
      success: true,
      message: "Today's nutrition fetched",
      data: nutrition || {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch nutrition data"
    });
  }
};

/**
 * GET NUTRITION HISTORY
 */
export const getNutritionHistory = async (req, res) => {
  try {
    const history = await Nutrition.find({
      userId: req.user._id
    }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "Nutrition history fetched",
      data: history
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch nutrition history"
    });
  }
};

/**
 * ADD MEAL BY PORTION (AUTO CALCULATED)
 */
export const addMealByPortion = async (req, res) => {
  try {
    const { foodName, quantity } = req.body; // quantity in grams

    if (!foodName || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Food name and quantity are required"
      });
    }

    const food = await Food.findOne({ name: foodName });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found in database"
      });
    }

    const factor = quantity / 100;

    const calories = Math.round(food.caloriesPer100g * factor);
    const protein = Number((food.proteinPer100g * factor).toFixed(1));
    const carbs = Number((food.carbsPer100g * factor).toFixed(1));
    const fats = Number((food.fatsPer100g * factor).toFixed(1));

    // today date normalize
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nutrition = await Nutrition.findOne({
      userId: req.user._id,
      date: today
    });

    if (!nutrition) {
      nutrition = await Nutrition.create({
        userId: req.user._id,
        date: today,
        meals: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0
      });
    }

    const meal = {
      name: foodName,
      calories,
      protein,
      carbs,
      fats
    };

    nutrition.meals.push(meal);
    nutrition.totalCalories += calories;
    nutrition.totalProtein += protein;
    nutrition.totalCarbs += carbs;
    nutrition.totalFats += fats;

    await nutrition.save();

    return res.status(201).json({
      success: true,
      message: "Meal added with auto-calculated nutrition",
      data: meal
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add meal"
    });
  }
};
