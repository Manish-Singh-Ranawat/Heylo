import { upsertStreamUser } from "../lib/stream.js";
import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

// -- ONBOARD -- //
export const onboard = (req, res) => editProfile(req, res, true);

// -- UPDATE PROFILE -- //
export const updateProfile = (req, res) => editProfile(req, res, false);

// -- GET RECOMMENDED USERS -- //
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    const receivedRequests = await FriendRequest.find({
      recipient: currentUser,
    });
    const receivedRequestsIds = receivedRequests.map(
      (request) => request.sender
    );
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } },
        { _id: { $nin: currentUser.friends } },
        { _id: { $nin: receivedRequestsIds } },
        { isOnboarded: true },
      ],
    });
    return res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- GET USER PROFILE -- //
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User id not found" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error in get public profile controller : ", error);
    res.status(500).json({
      message: "Failed to get public profile",
    });
  }
};

// -- SEARCH USERS -- //
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }
    // Escape special regex characters for safety
    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "i");
    const users = await User.find({
      $or: [{ username: regex }, { fullName: regex }],
    })
      .limit(10)
      .select("-password")
      .lean();
    res.json(users);
  } catch (error) {
    console.log("Error in searchUser controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- (helper for onboard or update) -- //
export const editProfile = async (req, res, isOnboarding = false) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
      profilePicture,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location ||
      !profilePicture
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
          !profilePicture && "profilePicture",
        ].filter(Boolean),
      });
    }
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        profilePicture,
        ...(isOnboarding && { isOnboarded: true }), // only set on onboarding
      },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    // update stream user
    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.username,
      image: updatedUser.profilePicture || "",
      language: updatedUser.nativeLanguage,
    });
    res.status(200).json({
      message: isOnboarding
        ? "Onboarding successful"
        : "Profile updated successfully",
    });
  } catch (error) {
    console.log("Error in onboard controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
