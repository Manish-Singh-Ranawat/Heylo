import toast from "react-hot-toast";
import { login } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { loginMutation: mutate, isLoggingIn: isPending, error };
};

export default useLoginMutation;
