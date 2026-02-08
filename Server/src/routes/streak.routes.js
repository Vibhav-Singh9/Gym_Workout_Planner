import express from "express";
import { getWorkoutStreak } from "../controllers/streak.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/current", authMiddleware, getWorkoutStreak);

export default router;