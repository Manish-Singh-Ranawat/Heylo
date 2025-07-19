import { axiosInstance } from "./axios";

// -- auth --
export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data?.user;
  } catch (error) {
    return null;
  }
};

// -- users --
export const onboard = async (onboardData) => {
  const res = await axiosInstance.post("/users/onboard", onboardData);
  return res.data;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users/recommend");
  return res.data;
};

export const fetchUserProfile = async (userId) => {
  const res = await axiosInstance.get(`/users/${userId}`);
  return res.data;
};

export const searchUsers = async (query) => {
  const res = await axiosInstance.get(`/users/search?query=${query}`);
  return res.data;
};

export const updateUserProfile = async (updateData) => {
  const res = await axiosInstance.put(`/users/profile`, updateData);
  return res.data;
};

// -- friends --
export const getUserFriends = async () => {
  const res = await axiosInstance.get("/friends");
  return res.data;
};

export const removeFriend = async (friendId) => {
  const res = await axiosInstance.delete(`/friends/${friendId}`);
  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/friends/requests");
  return res.data;
};

export const getOutgoingFriendRequest = async (userId) => {
  const res = await axiosInstance.get(`/friends/outgoing-requests/${userId}`);
  return res.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/friends/requests/${userId}`);
  return res.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(`/friends/requests/${requestId}`);
  return res.data;
};

export const deleteFriendRequest = async (requestId) => {
  const res = await axiosInstance.delete(`/friends/requests/${requestId}`);
  return res.data;
};

// -- chat --
export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};
