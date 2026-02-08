import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    height: {
        type: Number, //in cm
        required: true
    },

    bmi: {
        type: Number
    },

    date: {
        type: Date,
        default: Date.now
    }

}, { timestampes: true });

export default mongoose.model("Progress", progressSchema);