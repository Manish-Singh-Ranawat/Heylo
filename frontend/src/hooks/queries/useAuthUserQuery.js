import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../../lib/api";

const useAuthUserQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return { authUser: data, isLoadingAuthUser: isLoading };
};

export default useAuthUserQuery;
