import toast from "react-hot-toast";
import { sendFriendRequest } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSendFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendRequests", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      toast.success("Friend request sent");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return {
    sendFriendRequestMutation: mutate,
    isSendingFriendRequest: isPending,
  };
};

export default useSendFriendRequestMutation;
