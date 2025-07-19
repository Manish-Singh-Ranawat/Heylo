import toast from "react-hot-toast";
import { acceptFriendRequest } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAcceptFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ requestId }) => acceptFriendRequest(requestId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      toast.success("Friend request accepted");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return {
    acceptFriendRequestMutation: mutate,
    isAcceptingFriendRequest: isPending,
  };
};

export default useAcceptFriendRequestMutation;
