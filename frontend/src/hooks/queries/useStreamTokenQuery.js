import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../../lib/api";
import useAuthUserQuery from "./useAuthUserQuery";

const useStreamTokenQuery = () => {
  const { authUser } = useAuthUserQuery();
  const { data } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });
  return { tokenData: data };
};

export default useStreamTokenQuery;
