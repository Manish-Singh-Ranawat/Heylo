import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../../lib/api";

const useFriendsQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  return { friends: data || [], isLoadingFriends: isLoading };
};

export default useFriendsQuery;
