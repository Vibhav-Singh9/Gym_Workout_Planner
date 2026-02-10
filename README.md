# 🏋️ Gym Workout Planner – OTP Email Verification

Gym Workout Planner is a full-stack web application that allows users to register and verify their email using a secure One-Time Password (OTP) system.  
The backend handles OTP generation and validation, while OTP emails are sent from the frontend using **EmailJS** to avoid SMTP and domain verification issues on cloud platforms.

The backend is deployed on **Render** and the frontend on **Vercel**.

---

## ✨ Features

- User registration with email verification
- Secure OTP generation and validation
- OTP expiry time of 5 minutes
- Resend OTP support
- Email delivery using **EmailJS**
- Clean and modular backend architecture
- Fully cloud-deployed application

---

## 🛠 Tech Stack

**Frontend**
- React + Vite
- EmailJS
- Axios
- Deployed on Vercel

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- Deployed on Render

---

## 📩 OTP Verification Flow

1. User submits registration details
2. Backend generates an OTP and stores it in the database
3. Frontend sends the OTP email using EmailJS
4. User enters the OTP on the verification page
5. Backend verifies the OTP and activates the user account

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000

### Frontend (/client/.env)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

🚀 How to Run Locally

npm install
npm run dev

Server will start on: http://localhost:PORT