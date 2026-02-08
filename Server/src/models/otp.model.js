import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    emailId: String,
    otp: String,
    expiresAT: Date
});

const OTP = mongoose.model("Otp", otpSchema);

export default OTP;   