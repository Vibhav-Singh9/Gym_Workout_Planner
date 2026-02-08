import express from "express";
import { addFood } from "../controllers/food.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, isAdmin, addFood);

export default router;
