import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate fields
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    // Check if user exists

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await newUser.save();

    // Sign the token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "User created successfully!",
        user: newUser,
        token,
      });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
