import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import {validate} from "../utils/validate.js";

// SignUp Api
export const register = async (req, res)=>{
    try{
        validate(req.body);

        const { firstName, emailId, password} = req.body;

        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = "user";

        const user = await User.create(req.body);

        const token = jwt.sign(
            { _id: user._id, emailId, role: "user"},
            process.env.JWT_KEY,
            {expiresIn: "1h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            samesite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                emailId: user.emailId,
                role: user.role
            },
            message: "Signup successful"
        });
    }

    catch (err) {
    res.status(400).json({
    error: err.message
        });
    }    
};

// Login Api

export const login = async (req,res) =>{
    try {
        const{ emailId, password } = req.body;

        const user = await User.findOne({emailId});

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first"
      });
    }

        const isMatch = await bcrypt.compare(password, user.password);
        
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }
        const token = jwt.sign(
            {_id: user._id, emailId, role: user.role, firstName: user.firstName},
            process.env.JWT_KEY,
            {expiresIn: "1h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({ message: "Login successful"});
    }

    catch(err)
    {
        res.status(400).json({ error: err });
    }
};

// Logout Api

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     
      sameSite: "none",  
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};

export const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      emailId: req.user.emailId,
      role: req.user.role,
      firstName: req.user.firstName
    }
  });
};
