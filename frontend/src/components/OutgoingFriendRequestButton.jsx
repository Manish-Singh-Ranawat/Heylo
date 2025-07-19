import { UserMinus, UserPlus } from "lucide-react";
import useOutgoingFriendRequestQuery from "../hooks/queries/useOutgoingFriendRequestsQuery";
import useSendFriendRequestMutation from "../hooks/mutations/useSendFriendRequestMutation";
import useDeleteFriendRequestMutation from "../hooks/mutations/useDeleteFriendRequestMutation";

const OutgoingFriendRequestButton = ({ userId, styles }) => {
  const { outgoingFriendRequest, isLoadingOutgoingFriendRequest } =
    useOutgoingFriendRequestQuery(userId);
  const { sendFriendRequestMutation, isSendingFriendRequest } =
    useSendFriendRequestMutation();
  const { deleteFriendRequestMutation, isDeletingFriendRequest } =
    useDeleteFriendRequestMutation();

  const isLoading =
    isLoadingOutgoingFriendRequest ||
    isSendingFriendRequest ||
    isDeletingFriendRequest;

  const handleClick = () => {
    if (outgoingFriendRequest) {
      deleteFriendRequestMutation({
        requestId: outgoingFriendRequest._id,
        userId,
      });
    } else {
      sendFriendRequestMutation(userId);
    }
  };

  return (
    <button
      className={`btn ${styles} ${
        outgoingFriendRequest ? "btn-error" : "btn-primary"
      }`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {outgoingFriendRequest ? (
        <>
          <UserMinus className="size-4 mr-2" />
          Cancel Request
        </>
      ) : (
        <>
          <UserPlus className="size-4 mr-2" />
          Send Friend Request
        </>
      )}
    </button>
  );
};

export default OutgoingFriendRequestButton;
