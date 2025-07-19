import toast from "react-hot-toast";
import { signup } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Signed up successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { signupMutation: mutate, isSigningUp: isPending, error };
};

export default useSignupMutation;
