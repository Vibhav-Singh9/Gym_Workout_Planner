import Progress from "../models/progress.model.js";

// ADD DAILY PROGRESS

export const addProgress = async (req, res) => {
    try {
        const { weight, height } = req.body;

        if(!weight || !height) {
            return res.status(400).json({
                success: false,
                message: "Weight and height are required"
            });
        }

        const heightInMeters = height / 100;
        const bmi = Number((weight / (heightInMeters ** 2)).toFixed(2));

        const progress = await Progress.create({
            userId: req.user._id,
            weight,
            height,
            bmi
        });

        return res.status(201).json({
            success: true,
            message: "Progress added successfully",
            data: progress
        });
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to add progress"
        });
    }
};

// Get progress history

export const getProgressHistory = async (req, res) =>{
    try {
        const history = await Progress.find({ userId: req.user._id })
        .sort({ date: 1 });

        return res.status(200).json({
            success: true,
            message: "Progress history fetched",
            data: history
        });
    }

    catch (err) {
        return res.status(500).json({
            successs:false,
            message: "Failed to fetch progress history"
        });
    }
};