import express from "express";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendRequests,
  removeFriend,
  sendFriendRequest,
} from "../controllers/friend.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getMyFriends);
router.delete("/:id", removeFriend);
router.get("/requests", getFriendRequests);
router.get("/outgoing-requests/:id", getOutgoingFriendRequests);
router.post("/requests/:id", sendFriendRequest);
router.put("/requests/:id", acceptFriendRequest);
router.delete("/requests/:id", deleteFriendRequest);

export default router;
