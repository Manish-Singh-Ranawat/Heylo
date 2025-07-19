import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

// -- GET MY FRIENDS -- //
export const getMyFriends = async (req, res) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(currentUser._id)
      .select("friends")
      .populate("friends", "-password -email");
    return res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- REMOVE FRIEND -- //
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: friendId } = req.params;
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
    await FriendRequest.deleteMany({
      $or: [
        { sender: userId, recipient: friendId },
        { sender: friendId, recipient: userId },
      ],
    });
    return res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.log("Error in removeFriend controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- GET FRIEND REQUESTS -- //
export const getFriendRequests = async (req, res) => {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", "-password -email");

    const acceptedRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "-password -email");

    return res.status(200).json({
      incomingRequests,
      acceptedRequests,
    });
  } catch (error) {
    console.log("Error in getAllFriendRequest controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- SEND FRIEND REQUEST -- //
export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;
    
    if (myId == recipientId)
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(400).json({ message: "User not found" });

    if (recipient.friends?.includes(myId))
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest)
      return res.status(400).json({ message: "Friend request already exists" });

    const friendRequest = new FriendRequest({
      sender: myId,
      recipient: recipientId,
    });
    await friendRequest.save();
    return res.status(200).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- ACCEPT FRIEND REQUEST -- //
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest)
      return res.status(400).json({ message: "Friend request not found" });

    if (friendRequest.recipient.toString() != req.user._id)
      return res.status(400).json({
        message: "You are not authorized to accept this friend request",
      });

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- DELETE FRIEND REQUEST (Reject or Cancel or Delete) -- //
export const deleteFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: requestId } = req.params;
    if (!requestId)
      return res.status(400).json({ message: "Friend request not found" });
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    const isRecipient =
      friendRequest.recipient.toString() === userId.toString();
    const isSender = friendRequest.sender.toString() === userId.toString();

    if (!isRecipient && !isSender) {
      return res.status(403).json({
        message: "You are not authorized to delete this friend request",
      });
    }

    const action = isRecipient
      ? "Friend request rejected"
      : friendRequest.status === "pending"
      ? "Friend request cancelled"
      : "Notification deleted";

    await FriendRequest.findByIdAndDelete(requestId);

    return res.status(200).json({ message: action });
  } catch (error) {
    console.log("Error in deleteFriendRequest controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -- GET FRIEND REQUEST STATUS -- //
export const getFriendRequestStatus = async (req, res) => {};

// -- GET OUTGOING FRIEND REQUESTS -- //
export const getOutgoingFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: targetUserId } = req.params;
    const outgoingRequests = await FriendRequest.findOne({
      sender: userId,
      recipient: targetUserId,
      status: "pending",
    }).populate("recipient", "-password -email");
    return res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendRequests controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
