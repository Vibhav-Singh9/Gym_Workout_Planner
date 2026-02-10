import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (emailId, otp) => {
  console.log("📧 Sending OTP to:", emailId);

  const response = await resend.emails.send({
    from: "onboarding@resend.dev", 
    to: [emailId],                
    subject: "Your OTP for Gym Workout Planner",
    html: `
      <h2>Email Verification</h2>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
    `,
  });

  console.log("📨 Resend response:", response);
  return response;
};
