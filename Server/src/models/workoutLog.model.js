import mongoose from "mongoose";

const workoutLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    workoutPlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutPlan"
    },

    date: {
        type: Date,
        default: Date.now
    },

    completed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("WorkoutLog", workoutLogSchema);