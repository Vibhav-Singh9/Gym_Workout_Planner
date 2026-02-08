import express from "express";

import {
    addWater,
    getTodayWater
} from "../controllers/water.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addWater);
router.get("/today", authMiddleware, getTodayWater);

export default router;