import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

if (!state?.emailId) {
  navigate("/login");
  return null;
}

  const verifyOtp = async () => {
    try {
      await axios.post("/otp/verify", {
        emailId: state.emailId,
        otp
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Verify OTP and Login again</h2>
        <h2 className="text-red-600 font-bold text-base">OTP Expires in 5 minutes</h2>

        <input
          placeholder="Enter OTP"
          className="w-full p-2 border mb-3"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
