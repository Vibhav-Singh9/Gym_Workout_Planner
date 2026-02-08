import express from "express";

import {
    createWorkoutPlan,
    getMyWorkoutPlans,
    logWorkout,
    completeWorkout
}
from "../controllers/workout.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router =  express.Router();

router.post("/create", authMiddleware, createWorkoutPlan);
router.get("/my-plans", authMiddleware, getMyWorkoutPlans);
router.post("/log", authMiddleware, logWorkout);
router.patch("/complete/:logId", authMiddleware, completeWorkout);

export default router;