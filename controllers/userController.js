import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";



dotenv.config();

// Registration
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

 
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(401).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(401).json({
        message: "Username already exists",
        success: false,
      });
    }

   
    const hashedPassword = await bcryptjs.hash(password, 16);

   
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });


    const token = jwt.sign(
      { _id: newUser._id, isAdmin: newUser.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

    
    const userInfo = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
     
    };

    return res.status(201).json({
      message: "Account created successfully",
      result: { token, user: userInfo },
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "An internal server error occurred. Please try again later.",
      success: false,
    });
  }
};

// Login
export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        message: 'All fields are required',
        success: false
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username',
        success: false
      });
    }

    const didMatch = await bcryptjs.compare(password, user.password);

    if (!didMatch) {
      return res.status(401).json({
        message: 'Invalid password', 
        success: false
      });
    }

    
    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
   
    const userInfo = {  
      email: user.email, 
      name: user.name, 
      username: user.username,
      _id: user._id,
      
    };
      
    return res.status(200).json({ result: { token: jwtToken, user: userInfo } });
  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
