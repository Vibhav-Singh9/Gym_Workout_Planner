import Water from "../models/water.model.js";

// ADD Water Intake

export const addWater =  async (req, res) => {
    try {
        const { amount } = req.body;

        if(!amount || amount <= 0)
        {
            return res.status(400).json({
                success: false,
                message: "Water amount must be greater than 0"
            });
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        let waterLog = await Water.findOne({
            userId: req.user._id,
            date: today
        });

        if(!waterLog) {
            waterLog = await Water.create({
                userId: req.user._id,
                date: today,
                totalWater: 0
            });
        }

        waterLog.totalWater += amount;
        await waterLog.save();

        return res.status(200).json({
            success: true,
            message: "Water intake added",
            data: {
                total: waterLog.totalWater
            }
        });
    }

    catch (err) 
    {
        return res.status(500).json({
            success: false,
            message: "Failed to add water intake"
        });
    }
};

// Get today water intake

export const getTodayWater = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0,0,0,0);

        const waterLog = await Water.findOne({
            userId: req.user._id,
            date: today
        });

        return res.status(200).json({
            success: true,
            message: "Today's water intake fetched",
            data: {
                totalWater: waterLog ? waterLog.totalWater : 0
            }
        });  
    }

    catch (err)
    {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch water intake"
        });
    }
};