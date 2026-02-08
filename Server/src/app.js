import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import streakRoutes from "./routes/streak.routes.js";
import nutritionRoutes from "./routes/nutrition.routes.js";
import foodRoutes from "./routes/food.routes.js";
import waterRoutes from "./routes/water.routes.js";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/progress", progressRoutes)
app.use("/api/streak", streakRoutes  );
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/water", waterRoutes);

export default app;
