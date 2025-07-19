import { StreamChat } from "stream-chat";
import { ENV_VARS } from "./envVars.js";

const apiKey = ENV_VARS.STREAM_API_KEY;
const apiSecret = ENV_VARS.STREAM_API_SECRET;

if (!apiKey || !apiSecret) throw new Error("Missing Stream API key or secret");

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    const response = await streamClient.upsertUser(userData);
    return response;
  } catch (error) {
    console.log("error in upsertStreamUser", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    const token = streamClient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.log("error in generateStreamToken", error);
  }
};
