import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios";
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
      await axios.post("/auth/register", form);
      await axios.post("/otp/send", { emailId: form.emailId });
      navigate("/verify-otp", { state: { emailId: form.emailId } });
    } catch (err) {
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
    
    {/* PAGE WRAPPER */}
    <div className="max-w-md mx-auto pt-12 pb-10 flex flex-col items-center">
      
      {/* LOGO (NOW SAFE & VISIBLE) */}
      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
        <Dumbbell className="text-white w-8 h-8" />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-slate-900">
        Create Account
      </h1>
      <p className="text-xl text-blue-900 font-bold mb-8 text-center">
        Join Gym Workout Planner today
      </p>

      {/* CARD */}
      <div className="w-full bg-white rounded-3xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              name="firstName"
              required
              placeholder="John Doe"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="emailId"
              required
              placeholder="john@example.com"
              value={form.emailId}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              required
              placeholder="22"
              value={form.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl
            hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group"
          >
            Register
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
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
