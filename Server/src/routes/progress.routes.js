import express from "express";

import {
    addProgress,
    getProgressHistory
} from "../controllers/progress.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addProgress);
router.get("/history", authMiddleware, getProgressHistory);

export default router;