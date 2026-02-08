import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

import AddWorkoutForm from "../components/AddWorkoutForm";
import AddProgressForm from "../components/AddProgressForm";
import AddNutritionForm from "../components/AddNutritionForm";

const Dashboard = () => {
  const [bmi, setBmi] = useState(null);
  const [water, setWater] = useState(0);
  const [nutrition, setNutrition] = useState(null);
  const [workout, setWorkout] = useState([]);

  const refresh = async () => {
    axios.get("/nutrition/today").then(res => setNutrition(res.data.data));
    const res = await axios.get("/workout/my-plans")
    // console.log(res.data); This is for temporary check of data 
    setWorkout(res.data.data);

    const result = await axios.get("/progress/history")
    setBmi(result.data.data?.[0].bmi)
    // console.log(result)

    const water = await axios.get("/water/today")
    setWater(water.data.data.totalWater);
    console.log(water);
  };

  useEffect(() => { 
    refresh();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-500 p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Water Tracker */}
          <div className="rounded-xl p-5 shadow bg-blue-200">
            <h3 className="font-semibold mb-2 text-center text-2xl">💧 Water Intake</h3>
            <p className="text-2xl font-bold text-center">{water} ml</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => axios.post("/water/add", { amount: 250 }).then(() => setWater(w => w + 250))}
                className="flex-1 bg-blue-500 text-white py-2 rounded"
              >
                +250 ml
              </button>
              <button
                onClick={() => axios.post("/water/add", { amount: 500 }).then(() => setWater(w => w + 500))}
                className="flex-1 bg-green-500 text-white py-2 rounded"
              >
                +500 ml
              </button>
            </div>
          </div>

   {/* BMI Card */}
<div className="rounded-xl p-6 shadow grid grid-cols-2 gap-6 items-center bg-pink-200">
  {bmi ? (
    <>
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          🧮 BMI
        </h3>

        <p className="text-4xl font-bold text-indigo-600">
          {bmi}
        </p>
        <p className="text-sm text-gray-500 mt-1 font-bold">
          Body Mass Index
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center text-base leading-relaxed text-black">
        <p className="font-semibold text-lg mb-2">
          Key BMI Categories for Adults:
        </p>
        <p>Underweight: Below 18.5</p>
        <p>Healthy Weight: 18.5 - 24.9</p>
        <p>Overweight: 25.0 - 29.9</p>
        <p>Obese: 30.0 or higher</p>
      </div>
    </>
  ) : (
    <p className="text-sm text-gray-500 col-span-2 text-center">
      Add weight & height to calculate BMI
    </p>
  )}

</div>

          {/* Workout Summary */}
        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="font-semibold mb-4">🏋️ Your Workout Plans</h3>

          {workout.length > 0 ? (
            <div className="space-y-4">
              {workout.map((plan) => (
                <div
                  key={plan._id}
                  className="border rounded-lg p-3 bg-slate-50"
                >
                  <p className="text-sm font-bold mb-2 text-indigo-600">
                    Plan: {plan.planType}
                  </p>

                  <ul className="space-y-1 text-sm">
                    {plan.exercises.map((ex, i) => (
                      <li key={i} className="flex justify-between border-b pb-1">
                        <span>
                          {ex.name} — {ex.sets} x {ex.reps}
                        </span>
                        <span className="font-medium">
                          {ex.weight} kg
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No workout plans found
            </p>
          )}
        </div>

        {/* Nutrition Summary */}
            <div className="rounded-xl p-5 shadow text-4xl bg-purple-200">
              <h3 className="font-semibold text-5xl text-center text-purple-950 ">🍽️ Nutrition (Today)</h3>

              {nutrition ? (
                <ul className="text-4xl text-center flex flex-col gap-5 items-center justify-center p-6 mb-11 text-purple-500">
                  <li>Calories: <b>{nutrition.totalCalories}</b></li>
                  <li>Protein: <b>{nutrition.totalProtein} g</b></li>
                  <li>Carbs: <b>{nutrition.totalCarbs} g</b></li>
                  <li>Fats: <b>{nutrition.totalFats} g</b></li>

                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No nutrition data today
                </p>
              )}
            </div>

          </div>

            
           {/* FORMS */}
           <div className="mt-5">
        <div className="grid md:grid-cols-3 gap-6">
          <AddWorkoutForm onSuccess={refresh} />
          <AddProgressForm onSuccess={refresh} />
          <AddNutritionForm onSuccess={refresh} />
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
