import toast from "react-hot-toast";
import { removeFriend } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveFriendMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: removeFriend,
    onSuccess: (_, friendId) => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendRequests", friendId],
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile", friendId] });
      toast.success("Friend removed");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { removeFriendMutation: mutate, isRemovingFriend: isPending };
};

export default useRemoveFriendMutation;
