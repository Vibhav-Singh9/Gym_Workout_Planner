import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Export function (same pattern you were using)
export const sendOtpEmail = async (emailId, otp) => {
  console.log("📧 Sending OTP email to:", emailId);

  return resend.emails.send({
    from: "onboarding@resend.dev", 
    to: emailId,
    subject: "Your OTP for Gym Workout Planner",
    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
    `,
  });
};
