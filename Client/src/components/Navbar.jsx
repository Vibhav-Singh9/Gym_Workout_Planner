import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/auth/me")
      .then(res => setUser(res.data.data))
      .catch(() => navigate("/login"));
  }, []);

  const logout = async () => {
    await axios.post("/auth/logout");
    setLoading(true);
    
    setTimeout(()=>{
      setLoading(false);
      navigate("/login");
    },800)
  };

   // 🔄 Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-600 font-medium">
            Logout in process...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-indigo-600 text-white px-6 py-4 flex items-center justify-between fixed">
      <h1 className="text-lg font-bold">Gym Workout Planner</h1>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block font-medium">
          Hi, {user?.firstName}
        </span>

        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold"
          >
            Admin
          </button>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded-md text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
