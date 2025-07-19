import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../lib/api";

const useSearchUsersQuery = (query) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["searchUser", query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
  });
  return {
    searchUsers: data,
    isLoadingSearchUsers: isLoading,
    errorSearchUsers: error,
  };
};

export default useSearchUsersQuery;
