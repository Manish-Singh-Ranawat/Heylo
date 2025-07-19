import { useQuery } from "@tanstack/react-query";
import { getOutgoingFriendRequest } from "../../lib/api";

const useOutgoingFriendRequestQuery = (userId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["outgoingFriendRequests", userId],
    queryFn: () => getOutgoingFriendRequest(userId),
    enabled: !!userId,
  });
  return {
    outgoingFriendRequest: data,
    isLoadingOutgoingFriendRequest: isLoading,
  };
};

export default useOutgoingFriendRequestQuery;
