import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

const Water = () => {
  const [total, setTotal] = useState(0);

  const fetchWater = async () => {
    const res = await axios.get("/water/today");
    setTotal(res.data.data.totalWater);
  };

  const addWater = async (amount) => {
    await axios.post("/water/add", { amount });
    fetchWater();
  };

  useEffect(() => {
    fetchWater();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-bold mb-2">
            💧 Water Intake
          </h2>

          <p className="text-gray-700 mb-4">
            Total today: <b>{total} ml</b>
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => addWater(250)}
              className="flex-1 bg-blue-500 text-white py-2 rounded"
            >
              +250 ml
            </button>

            <button
              onClick={() => addWater(500)}
              className="flex-1 bg-green-500 text-white py-2 rounded"
            >
              +500 ml
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Water;
