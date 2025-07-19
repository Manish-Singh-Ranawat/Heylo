import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getRecommendedUsers,
  getUserProfile,
  onboard,
  searchUsers,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/onboard", onboard);
router.get("/recommend", getRecommendedUsers);
router.get("/search",searchUsers);
router.put("/profile", updateProfile);
router.get("/:userId", getUserProfile);

export default router;
