import toast from "react-hot-toast";
import { updateUserProfile } from "../../lib/api";
import useAuthUserQuery from "../queries/useAuthUserQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUserQuery();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({
        queryKey: ["userProfile", authUser._id],
      });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  return { updateProfileMutation: mutate, isUpdatingProfile: isPending };
};

export default useUpdateProfileMutation;
