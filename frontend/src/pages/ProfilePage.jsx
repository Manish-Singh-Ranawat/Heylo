import { useState } from "react";
import { Link, useParams } from "react-router";
import { BadgeCheck, MapPin, Pencil, Users, UserX } from "lucide-react";
import { capitalize, getLanguageFlag } from "../lib/utils";
import ProfileForm from "../components/ProfileForm";
import PageLoader from "../components/PageLoader";
import OutgoingFriendRequestButton from "../components/OutgoingFriendRequestButton";
import useAuthUserQuery from "../hooks/queries/useAuthUserQuery";
import useUserProfileQuery from "../hooks/queries/useUserProfileQuery";
import useFriendRequestsQuery from "../hooks/queries/useFriendRequestsQuery";
import useRemoveFriendMutation from "../hooks/mutations/useRemoveFriendMutation";
import useUpdateProfileMutation from "../hooks/mutations/useUpdateProfileMutation";
import useAcceptFriendRequestMutation from "../hooks/mutations/useAcceptFriendRequestMutation";
import useDeleteFriendRequestMutation from "../hooks/mutations/useDeleteFriendRequestMutation";

const ProfilePage = () => {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { authUser, isLoadingAuthUser } = useAuthUserQuery();
  const { userProfile, isLoadingUserProfile, errorUserProfile } =
    useUserProfileQuery(userId);
  const { friendRequests, isLoadingFriendRequests } = useFriendRequestsQuery();

  const { updateProfileMutation, isUpdatingProfile } =
    useUpdateProfileMutation();
  const { removeFriendMutation, isRemovingFriend } = useRemoveFriendMutation();
  const { acceptFriendRequestMutation, isAcceptingFriendRequest } =
    useAcceptFriendRequestMutation();
  const { deleteFriendRequestMutation, isDeletingFriendRequest } =
    useDeleteFriendRequestMutation();

  if (isLoadingUserProfile || isLoadingAuthUser || isLoadingFriendRequests)
    return <PageLoader />;

  if (errorUserProfile || !userProfile || !authUser || !friendRequests)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-lg font-bold text-error">
          {errorUserProfile?.response?.data?.message || "Something went wrong"}
        </span>
      </div>
    );

  const isOwnProfile = authUser?.username === userProfile?.username;
  const areFriends = userProfile?.friends?.includes(authUser?._id);
  const incomingRequests = friendRequests?.incomingRequests || [];

  const incomingFriendRequest = incomingRequests.find((request) => {
    return request.sender?._id === userProfile?._id;
  });

  const hasIncomingFriendRequest = !!incomingFriendRequest;

  const renderActionButton = () => {
    if (areFriends)
      return (
        <>
          <button
            className="flex-1 btn btn-error sm:btn-wide"
            onClick={() =>
              document.getElementById("remove_friend_modal").showModal()
            }
          >
            <UserX className="size-4 mr-2" />
            Remove Friend
          </button>

          {/* Confirmation Modal */}
          <dialog id="remove_friend_modal" className="modal">
            <div className="modal-box max-w-sm">
              <p className="py-4 text-center text-base text-gray-300">
                Are you sure you want to remove{" "}
                <strong className="text-white">
                  {userProfile.fullName || userProfile.username}
                </strong>{" "}
                from your friends list?
              </p>
              <div className="modal-action flex justify-center gap-4">
                <button
                  className="btn btn-outline flex-1"
                  onClick={() =>
                    document.getElementById("remove_friend_modal").close()
                  }
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error btn-outline flex-1"
                  onClick={() => removeFriendMutation(userProfile._id)}
                  disabled={isRemovingFriend}
                >
                  Confirm
                </button>
              </div>
            </div>
            {/* Click outside to close */}
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      );

    if (hasIncomingFriendRequest) {
      return (
        <div className="flex items-center gap-2 lg:gap-4">
          <button
            className="btn btn-primary"
            onClick={() =>
              acceptFriendRequestMutation({
                requestId: incomingFriendRequest._id,
                userId: userProfile._id,
              })
            }
            disabled={isAcceptingFriendRequest}
          >
            Accept
          </button>
          <button
            className="btn btn-error"
            onClick={() =>
              deleteFriendRequestMutation({
                requestId: incomingFriendRequest._id,
                userId: userProfile._id,
              })
            }
            disabled={isDeletingFriendRequest}
          >
            Reject
          </button>
        </div>
      );
    }
    return (
      <OutgoingFriendRequestButton
        userId={userProfile._id}
        styles={"sm:btn-wide"}
      />
    );
  };

  const {
    username,
    fullName,
    profilePicture,
    bio,
    nativeLanguage,
    learningLanguage,
    location,
    friends,
    isOnboarded,
  } = userProfile;

  if (isOwnProfile && isOnboarded && isEditing) {
    return (
      <ProfileForm
        isOnboarding={false}
        mutateFn={updateProfileMutation}
        isPending={isUpdatingProfile}
        setIsEditing={setIsEditing}
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container card card-sm bg-base-200 shadow-md mx-auto max-w-xl">
        <div className="card-body rounded-box m-2">
          {/* Header */}
          <div className="w-full card-title flex flex-row space-x-4">
            {/* Avatar */}
            <div className="avatar w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profilePicture} alt="User Avatar" />
            </div>
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold flex items-center ">
                {fullName || username}
                {isOnboarded && (
                  <BadgeCheck className="text-success w-5 h-5 ml-2" />
                )}
              </h2>
              <p className="ml-1 text-gray-400">@{username}</p>
              {location && (
                <div className="mt-2 text-sm flex items-center justify-start  text-gray-500">
                  <MapPin className="size-4 mr-1" />
                  {location}
                </div>
              )}
            </div>
          </div>
          {/* Languages with flags */}
          <div className="mt-4 flex justify-start">
            <div className="flex flex-wrap gap-2">
              {nativeLanguage && (
                <span className="badge badge-secondary text-sm">
                  {getLanguageFlag(nativeLanguage)} Native:{" "}
                  {capitalize(nativeLanguage)}
                </span>
              )}
              {learningLanguage && (
                <span className="badge badge-outline text-sm">
                  {getLanguageFlag(learningLanguage)} Learning:{" "}
                  {capitalize(learningLanguage)}
                </span>
              )}
            </div>
          </div>
          {/* Bio */}
          {bio && (
            <p className="mt-2 ml-2 text-lg text-gray-300  text-start">{bio}</p>
          )}

          {/* Actions */}
          <div className="mt-2 flex flex-1 items-center justify-center gap-4">
            <span className="flex btn btn-outline sm:btn-wide  items-center gap-2">
              <Users className="size-4" /> {friends?.length || 0} Friends
            </span>
            {isOnboarded &&
              (isOwnProfile ? (
                <button
                  className="flex flex-1 btn btn-primary sm:btn-wide items-center gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="size-4" /> Edit Profile
                </button>
              ) : (
                renderActionButton()
              ))}
          </div>
          {/* Message */}
          {isOnboarded && !isOwnProfile && areFriends && (
            <Link
              className="mt-2 btn btn-primary"
              to={`/chat/${userProfile._id}`}
            >
              Message
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
