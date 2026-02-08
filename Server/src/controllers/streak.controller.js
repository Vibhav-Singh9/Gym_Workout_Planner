import WorkoutLog from "../models/workoutLog.model.js";

export const getWorkoutStreak = async (req, res) => {
    try {
        const logs = await WorkoutLog.find({
            userId: req.user._id,
            completed: true
        }).sort({ date: -1 });

        if(logs.length === 0) 
        {
            return res.status(200).json({
                success: true,
                message: "No workouts yet",
                data: { curreantStreak: 0 }
            });
        }

        // Convert dates to Years-Months-Date format(Remove time from this)

        const workoutDays = [
            ...new Set(
                logs.map(log =>
                    log.date.toISOString().split("T")[0]
                )
            )
        ];

        let streak = 0;
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        for(let i=0; i<workoutDays.length; i++) {
            const workoutDate = new Date(workoutDays[i]);
            workoutDate.setHours(0, 0, 0, 0);

            const diff = 
            (today - workoutDate) / (1000 * 60 * 60 * 24);

            if(diff === streak) {
                streak++;
            }
            else {
                break;
            }
        }

        return res.status(200).json({
            success: true,
            message: "Workout streak calculated",
            data: {
                currentStreak: streak
            }
        });
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to calculate streak"
        });
    }
};