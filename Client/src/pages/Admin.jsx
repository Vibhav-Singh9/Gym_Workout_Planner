import { useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    caloriesPer100g: "",
    proteinPer100g: "",
    carbsPer100g: "",
    fatsPer100g: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFood = async () => {
    try {
      await axios.post("/food/add", {
        name: form.name,
        caloriesPer100g: Number(form.caloriesPer100g),
        proteinPer100g: Number(form.proteinPer100g),
        carbsPer100g: Number(form.carbsPer100g),
        fatsPer100g: Number(form.fatsPer100g)
      });

      alert("Food added successfully");

      // clear form
      setForm({
        name: "",
        caloriesPer100g: "",
        proteinPer100g: "",
        carbsPer100g: "",
        fatsPer100g: ""
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add food");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Admin – Add Food
          </h2>

          <input
            name="name"
            placeholder="Food Name (Chicken Breast)"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            name="caloriesPer100g"
            placeholder="Calories per 100g"
            value={form.caloriesPer100g}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            name="proteinPer100g"
            placeholder="Protein per 100g (g)"
            value={form.proteinPer100g}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            name="carbsPer100g"
            placeholder="Carbs per 100g (g)"
            value={form.carbsPer100g}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            name="fatsPer100g"
            placeholder="Fats per 100g (g)"
            value={form.fatsPer100g}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            onClick={addFood}
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700"
          >
            Add Food
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
