# 🏋️ Gym Workout Planner – OTP Email Verification

A full-stack Gym Workout Planner application with secure **email-based OTP verification** using **Brevo Transactional Email API**.  
Built with **Node.js, Express, MongoDB**, and deployed on **Render**.

---

## ✨ Features
- User registration with email verification
- Secure OTP generation & validation
- OTP expiry (5 minutes)
- Resend OTP support
- Email delivery using Brevo API 
- Clean backend architecture

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Email Service:** Brevo Transactional Email API
- **Deployment:** Render, Vercel
- **Auth Support:** OTP-based email verification

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string
BREVO_API_KEY=your_brevo_api_key

🚀 How to Run Locally

npm install
npm run dev

Server will start on: http://localhost:PORT

📩 OTP Flow

1. User submits email
2. OTP is generated and stored in DB
3. OTP email sent via Brevo API
4. User verifies OTP
5. Account marked as verified
