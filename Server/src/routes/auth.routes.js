import express from "express";
import { register, login, logout, getMe } from "../controllers/auth.Controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/me", authMiddleware, getMe);

export default router;