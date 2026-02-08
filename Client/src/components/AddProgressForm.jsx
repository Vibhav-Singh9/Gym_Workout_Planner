import { useState } from "react";
import axios from "../utils/axios";

const AddProgressForm = ({ onSuccess }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const submitProgress = async () => {
    try {
      await axios.post("/progress/add", {
        weight: Number(weight),
        height: Number(height)
      });

      alert("Progress updated");
      onSuccess();
    } catch {
      alert("Failed to update progress");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold mb-3">Update Body Progress</h3>

      <input
        placeholder="Weight (kg)"
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        placeholder="Height (cm)"
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setHeight(e.target.value)}
      />

      <button
        onClick={submitProgress}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Calculate BMI
      </button>
    </div>
  );
};

export default AddProgressForm;
