import toast from "react-hot-toast";
import { onboard } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOnboardingMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: onboard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile onboarded successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { onboardingMutation: mutate, isOnboarding: isPending };
};

export default useOnboardingMutation;
