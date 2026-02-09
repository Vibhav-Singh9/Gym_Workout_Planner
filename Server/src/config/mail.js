import nodemailer from "nodemailer";

let transporter = null;

export const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
      },
    });
  }
  return transporter;
};
