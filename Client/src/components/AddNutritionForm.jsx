import { useState } from "react";
import axios from "../utils/axios";

const AddNutritionForm = ({ onSuccess }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const submitMeal = async () => {
    try {
      await axios.post("/nutrition/add-meal-by-portion", {
        foodName,
        quantity: Number(quantity)
      });

      alert("Meal added");
      onSuccess();
    } catch {
      alert("Failed to add meal");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold mb-3">Add Meal</h3>

      <input
        placeholder="Food Name (Chicken Breast)"
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setFoodName(e.target.value)}
      />

      <input
        placeholder="Quantity (grams)"
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button
        onClick={submitMeal}
        className="w-full bg-orange-600 text-white py-2 rounded"
      >
        Add Meal
      </button>
    </div>
  );
};

export default AddNutritionForm;
