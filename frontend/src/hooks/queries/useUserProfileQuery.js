import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../lib/api";

const useUserProfileQuery = (userId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });
  return {
    userProfile: data,
    isLoadingUserProfile: isLoading,
    errorUserProfile: error,
  };
};

export default useUserProfileQuery;
