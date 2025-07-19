import { getRecommendedUsers } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

const useRecommendedUsersQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });
  return { recommendedUsers: data || [], isLoadingRecommendedUsers: isLoading };
};

export default useRecommendedUsersQuery;
