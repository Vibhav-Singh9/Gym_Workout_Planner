import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },

    emailId: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase:true,
        immutable: true
    },

    password: {
        type: String,
        require: true,
    },

    age: {
        type: Number,
        require: true,
        min: 12,
        max: 80
    },

    role: {
    type: String,
    default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;   