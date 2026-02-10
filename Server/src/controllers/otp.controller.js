import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";

export const sendOtp = async (req, res) => {
  try {
    const { emailId } = req.body;

    if (!emailId) throw "Email is required";

    const user = await User.findOne({ emailId });
    if (!user) throw "User not found";

    if (user.isVerified) {
      return res.json({ message: "Email already verified" });
    }

    const otp = generateOtp();

    await OTP.deleteMany({ emailId });

    await OTP.create({
      emailId,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // 🔥 SEND EMAIL (API – non blocking)

        res.status(200).json({
        message: "OTP generated",
        otp // 
      });


  } catch (err) {
    console.log("❌ SEND OTP ERROR:", err);
    res.status(400).json({
      error: err?.message || err || "Unknown error",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { emailId, otp } = req.body;

    if (!emailId || !otp) {
      throw "Email and OTP are required";
    }

    const record = await OTP.findOne({emailId,otp});
    if (!record) throw "Invalid OTP";


    if (record.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: record._id });
      throw "OTP expired";
    }

    await User.updateOne(
      { emailId },
      { $set: { isVerified: true } }
    );

    await OTP.deleteOne({ _id: record._id });

    res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (err) {
    res.status(400).json({ error: err });
  }
};
