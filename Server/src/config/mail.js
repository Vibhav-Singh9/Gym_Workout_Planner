import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOtpEmail = async (emailId, otp) => {
  console.log("📧 Sending OTP email to:", emailId);

  return emailApi.sendTransacEmail({
    sender: {
      email: "js3414656@gmail.com", // IMPORTANT
      name: "Gym Workout Planner",
    },
    to: [{ email: emailId }],
    subject: "Your OTP for Gym Workout Planner",
    htmlContent: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
    `,
  });
};
