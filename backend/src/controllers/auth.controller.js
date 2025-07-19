import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV_VARS } from "../lib/envVars.js";
import { upsertStreamUser } from "../lib/stream.js";

// -- SIGNUP -- //
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Please enter a valid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });

    // check if user already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Generate random avatar
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      username,
      email,
      password: hashPassword,
      profilePicture: randomAvatar,
    });

    // create stream user
    const streamResponse = await upsertStreamUser({
      id: user._id.toString(),
      name: user.username,
      image: user.profilePicture || "",
    });
    if (!streamResponse)
      return res.status(500).json({ message: "Internal Server Error" });

    // save user
    await user.save();

    // create jwt token and set cookie
    const token = jwt.sign({ userId: user._id }, ENV_VARS.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt-token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: ENV_VARS.NODE_ENV === "production",
    });
    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- LOGIN -- //
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // create jwt token and set cookie
    const token = jwt.sign({ userId: user._id }, ENV_VARS.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt-token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: ENV_VARS.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- LOGOUT -- //
export const logout = async (req, res) => {
  try {
    // clear cookie
    res.clearCookie("jwt-token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
