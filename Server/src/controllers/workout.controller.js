import WorkoutPlan from "../models/workoutPlan.model.js";
import WorkoutLog from "../models/workoutLog.model.js";

// Create Workout Plan

export const createWorkoutPlan = async (req, res) => {
  try {
    const { planType, exercises } = req.body;

    if (!planType || !exercises || !Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Plan type and exercises are required"
      });
    }

      // req.user comes from auth middleware
    const userId = req.user._id;

    // Check if workout plan already exists
    let workoutPlan = await WorkoutPlan.findOne({
      userId,
      planType
    });

        if (workoutPlan) {
      // 👉 ADD exercises to existing document
      workoutPlan.exercises.push(...exercises);
      await workoutPlan.save();

      return res.status(200).json({
        success: true,
        message: "Exercises added to existing workout plan",
        data: workoutPlan
      });
    }

      workoutPlan = await WorkoutPlan.create({
      userId,
      planType,
      exercises
    });

    return res.status(201).json({
      success: true,
      message: "Workout plan created successfully",
      data: workoutPlan
    });
  } 
  
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create workout plan"
    });
  }
};


// Get all workout plans of user

export const getMyWorkoutPlans = async (req,res) => {
    try {
        const workouts = await WorkoutPlan.find({ userId: req.user._id});

        return res.status(200).json({
            success: true,
            message: "Workour plans fetched",
            data: workouts
        });
    }

    catch (err)
    {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch workout plans"
        });
    }
};

// Log Today's Workout  

export const logWorkout = async (req, res) => {
    try {
        const { workoutPlanId } = req.body;

        if(!workoutPlanId) {
            return res.status(400).json({
                success: false,
                message: "Workout plan ID required"
            });
        }

        const log = await WorkoutLog.create({
            userId: req.user._id,
            workoutPlanId
        });

        return res.status(201).json({
            success: true,
            message: "Workout logged for today",
            data: log
        });
    }

    catch (err)
    {
        return res.status(500).json({
            success: false,
            message: "Failed to log workout"
        });
    }
};

// Mark workout as completed

export const completeWorkout = async (req, res) => {
    try {
        const { logId } = req.params;

        const log = await WorkoutLog.findOneAndUpdate(
            {_id: logId, userId: req.user._id },
            { completed: true },
            { new: true }
        );

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Workout log not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workout marked as completed",
            data: log
        });
    }
    
    catch (err)
    {
        return res.status(500).json({
            success: false,
            message: "Failed to complete workout"
        });
    }
};