import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendOtpEmail(email, otp) {
  return tranEmailApi.sendTransacEmail({
    sender: {
      email: "your-brevo-email@gmail.com",
      name: "Vibhav",
    },
    to: [{ email }],
    subject: "Your OTP",
    htmlContent: `
      <h2>OTP Verification</h2>
      <p>Your OTP is <b>${otp}</b></p>
      <p>Valid for 5 minutes</p>
    `,
  });
}
