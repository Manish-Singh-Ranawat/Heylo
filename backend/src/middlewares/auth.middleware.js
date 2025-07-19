import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV_VARS } from "../lib/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    // get token from cookie
    const token = req.cookies["jwt-token"];
    if (!token)
      return res.status(401).json({ message: "Unauthorized - NO TOKEN" });
    // verify token and get user
    const { userId } = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
    if (!userId)
      return res.status(401).json({ message: "Unauthorized - INVALID TOKEN" });
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res.status(401).json({ message: "Unauthorized - USER NOT FOUND" });
    // attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
