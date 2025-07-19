import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import PageLoader from "../components/PageLoader";
import CallContent from "../components/CallContent";
import useAuthUserQuery from "../hooks/queries/useAuthUserQuery";
import useStreamTokenQuery from "../hooks/queries/useStreamTokenQuery";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {

  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoadingAuthUser } = useAuthUserQuery();
  const { tokenData } = useStreamTokenQuery();

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;
      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture,
        };
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });
        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.log("error in initCall", error);
        toast.error("Could not connect to call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };
    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoadingAuthUser || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not connect to call. Please refresh or try again.</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPage;
