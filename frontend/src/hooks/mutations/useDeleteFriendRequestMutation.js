import toast from "react-hot-toast";
import { deleteFriendRequest } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ requestId }) => deleteFriendRequest(requestId),
    onSuccess: ({ message }, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendRequests", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return {
    deleteFriendRequestMutation: mutate,
    isDeletingFriendRequest: isPending,
  };
};

export default useDeleteFriendRequestMutation;
