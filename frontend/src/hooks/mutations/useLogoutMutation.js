import toast from "react-hot-toast";
import { logout } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { logoutMutation: mutate, isLoggingOut: isPending };
};

export default useLogoutMutation;
