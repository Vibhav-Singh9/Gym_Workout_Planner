import { useState } from "react";
import axios from "../utils/axios";

const AddWorkoutForm = ({ onSuccess }) => {
  const [planType, setPlanType] = useState("PUSH");
  const [exercise, setExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: ""
  });

  const submitWorkout = async () => {
    try {
      await axios.post("/workout/create", {
        planType,
        exercises: [{
          name: exercise.name,
          sets: Number(exercise.sets),
          reps: Number(exercise.reps),
          weight: Number(exercise.weight)
        }]
      });

      alert("Workout added");
      onSuccess();
    } catch {
      alert("Failed to add workout");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold mb-3">Add Workout</h3>

      <select
        value={planType}
        onChange={(e) => setPlanType(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      >
        <option>PUSH</option>
        <option>PULL</option>
        <option>LEGS</option>
      </select>

      <input
        placeholder="Exercise Name"
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
      />

      <div className="flex gap-2">
        <input placeholder="Sets" className="border p-2 w-1/3"
          onChange={(e) => setExercise({ ...exercise, sets: e.target.value })} />
        <input placeholder="Reps" className="border p-2 w-1/3"
          onChange={(e) => setExercise({ ...exercise, reps: e.target.value })} />
        <input placeholder="Weight" className="border p-2 w-1/3"
          onChange={(e) => setExercise({ ...exercise, weight: e.target.value })} />
      </div>

      <button
        onClick={submitWorkout}
        className="w-full mt-3 bg-indigo-600 text-white py-2 rounded"
      >
        Save Workout
      </button>
    </div>
  );
};

export default AddWorkoutForm;
