import { Link } from "react-router";
import { Bell, BellOff, Clock, MessageSquare, UserCheck } from "lucide-react";
import { capitalize } from "../lib/utils";
import NoNotificationsFound from "../components/NoNotificationsFound";
import useFriendRequestsQuery from "../hooks/queries/useFriendRequestsQuery";
import useAcceptFriendRequestMutation from "../hooks/mutations/useAcceptFriendRequestMutation";
import useDeleteFriendRequestMutation from "../hooks/mutations/useDeleteFriendRequestMutation";

const NotificationPage = () => {
  const { friendRequests, isLoadingFriendRequests } = useFriendRequestsQuery();

  const { acceptFriendRequestMutation, isAcceptingFriendRequest } =
    useAcceptFriendRequestMutation();

  const { deleteFriendRequestMutation, isDeletingFriendRequest } =
    useDeleteFriendRequestMutation();

  const incomingRequests = friendRequests?.incomingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoadingFriendRequests ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Incoming Friend Requests */}
            {incomingRequests && incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* User Avatar */}
                            <Link
                              to={`/profile/${request.sender._id}`}
                              className="w-14 aspect-square rounded-full overflow-hidden bg-base-300"
                            >
                              <img
                                src={request.sender.profilePicture}
                                alt={request.sender.fullName}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </Link>
                            {/* User Info */}
                            <div>
                              <h3 className="font-semibold text-lg">
                                <Link to={`/profile/${request.sender._id}`}>
                                  {request.sender.fullName}
                                </Link>
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native:{" "}
                                  {capitalize(request.sender.nativeLanguage)}
                                </span>
                                <span className="hidden sm:block badge badge-outline badge-sm">
                                  Learning:{" "}
                                  {capitalize(request.sender.learningLanguage)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-2 lg:gap-4">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                acceptFriendRequestMutation({
                                  requestId: request._id,
                                  userId: request.sender._id,
                                })
                              }
                              disabled={isAcceptingFriendRequest}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-error btn-sm"
                              onClick={() =>
                                deleteFriendRequestMutation({
                                  requestId: request._id,
                                  userId: request.sender._id,
                                })
                              }
                              disabled={isDeletingFriendRequest}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Friend Requests */}
            {acceptedRequests && acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-success" />
                  New Connections
                </h2>
                <div className="space-y-3">
                  {acceptedRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <Link
                            to={`/profile/${request.recipient._id}`}
                            className="avatar mt-1 size-10 rounded-full"
                          >
                            <img
                              src={request.recipient.profilePicture}
                              alt={request.recipient.fullName}
                            />
                          </Link>
                          {/*  Info */}
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              <Link to={`/profile/${request.recipient._id}`}>
                                {request.recipient.fullName}
                              </Link>
                            </h3>
                            <p className="text-sm my-1">
                              {request.recipient.fullName} accepted your friend
                              request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <Clock className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 lg:gap-4 justify-center items-center mt-1">
                            <div className="badge badge-success">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              New Friend
                            </div>
                            <div
                              className="badge badge-error hover:cursor-pointer"
                              onClick={() => {
                                deleteFriendRequestMutation({
                                  requestId: request._id,
                                  userId: request.recipient._id,
                                });
                              }}
                            >
                              <BellOff className="size-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotificationsFound />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
