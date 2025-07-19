import { Link } from "react-router";
import { UserPlus } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import useFriendsQuery from "../hooks/queries/useFriendsQuery";
import useFriendRequestsQuery from "../hooks/queries/useFriendRequestsQuery";

const FriendsPage = () => {
  const { friends, isLoadingFriends } = useFriendsQuery();
  const { friendRequests } = useFriendRequestsQuery();

  const isUnread = friendRequests?.incomingRequests?.length > 0;
  return (
    <div className="p-4 sm:p-6 lg:p-8 container mx-auto space-y-6 lg:max-w-[80%]">
      {/* Friends Header */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Your Friends
        </h2>
        <Link to="/notifications" className="btn btn-outline btn-sm relative">
          {isUnread && (
            <span className="size-2.5 rounded-full bg-secondary inline-block absolute top-1 right-1.5 z-10" />
          )}
          <UserPlus className="mr-1 size-4" />
          Friend Requests
        </Link>
      </div>
      {isLoadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
