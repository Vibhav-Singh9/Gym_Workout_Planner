import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios";
import emailjs from "@emailjs/browser";
import { Dumbbell, ArrowRight } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    emailId: "",
    password: "",
    age: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 1️⃣ Register user
      await axios.post("/auth/register", form);

      // 2️⃣ Generate OTP from backend
      const otpRes = await axios.post("/otp/send", {
        emailId: form.emailId
      });

      const otp = otpRes.data.otp;

      // 3️⃣ Send OTP via EmailJS (FRONTEND ONLY)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: form.emailId,
          otp: otp
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 4️⃣ Navigate to verify OTP page
      navigate("/verify-otp", {
        state: { emailId: form.emailId }
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-200 to-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-200 font-medium">
            Creating account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen justify-center bg-gray-500 bg-gradient-to-b from-slate-300 via-slate-600 to-slate-950">
      <div className="max-w-md mx-auto pt-12 pb-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
          <Dumbbell className="text-white w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Create Account
        </h1>
        <p className="text-xl text-blue-900 font-bold mb-8 text-center">
          Join Gym Workout Planner today
        </p>

        <div className="w-full bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              name="firstName"
              required
              placeholder="John Doe"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
            />

            <input
              type="email"
              name="emailId"
              required
              placeholder="john@example.com"
              value={form.emailId}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
            />

            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
            />

            <input
              type="number"
              name="age"
              required
              placeholder="22"
              value={form.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              Register
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
