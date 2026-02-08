import mongoose from "mongoose";

const excerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    sets: Number,
    reps: Number,
    weight: Number
}, { _id: false });

const workoutPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    planType: {
        type: String,
        enum: ["PUSH", "PULL", "LEGS", "BRO_SPLIT", "CUSTOM"],
        required: true
    },

    exercises: [excerciseSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("WorkoutPlan", workoutPlanSchema);