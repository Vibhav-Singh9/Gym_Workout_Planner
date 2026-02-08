import express from "express";
import {
    addMealByPortion,
  addMeal,
  getTodayNutrition,
  getNutritionHistory
} from "../controllers/nutrition.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add-meal-by-portion", authMiddleware, addMealByPortion);
router.post("/add-meal", authMiddleware, addMeal);
router.get("/today", authMiddleware, getTodayNutrition);
router.get("/history", authMiddleware, getNutritionHistory);

export default router;
