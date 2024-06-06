import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";

// Register Route
const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, conformPassword } = req.body;

    if (
      [username, email, password, conformPassword].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({ errorMessage: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: "Password must be at least 6 characters" });
    }
    if (password !== conformPassword) {
      return res.status(400).json({
        errorMessage: "Passwords didn't match",
      });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ errorMessage: "Invalid email" });
    }
    const userCheck = await User.findOne({ $or: [{ username }, { email }] });
    if (userCheck) {
      return res
        .status(400)
        .json({ errorMessage: "Username or email already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const responseUser = await User.findById(user._id).select(
      "-password -conformPassword"
    );
    res
      .status(200)
      .json({ message: "User successfully registered!", responseUser });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Error while registering user", error });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req);
    if (!password) {
      return res.status(400).json({ errorMessage: "Password is required" });
    }

    if (!username && !email) {
      return res
        .status(400)
        .json({ errorMessage: "Username or email is required" });
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    const isPasswordCorrect = await user.passwordCheck(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ errorMessage: "Invalid password" });
    }

    const token = user.generateToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: true })
      .json({ message: "User logged in", loggedInUser });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Error while logging in", error });
  }
});

const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("token", { httpOnly: true, secure: true })
    .json({ message: "User logged out successfully." });
});

export { register, login, logout };
