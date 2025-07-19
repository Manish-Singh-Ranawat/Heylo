import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../../lib/api";

const useFriendRequestsQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  return { friendRequests: data, isLoadingFriendRequests: isLoading };
};

export default useFriendRequestsQuery;
