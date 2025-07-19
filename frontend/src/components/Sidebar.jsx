import { Link, useLocation } from "react-router";
import { Bell, Home, Users } from "lucide-react";
import useAuthUserQuery from "../hooks/queries/useAuthUserQuery";
import useFriendRequestsQuery from "../hooks/queries/useFriendRequestsQuery";

const Sidebar = () => {
  const { authUser } = useAuthUserQuery();
  const location = useLocation();
  const currentPath = location.pathname;
  const { friendRequests } = useFriendRequestsQuery();

  const notificationsCount =
    friendRequests?.incomingRequests?.length +
    friendRequests?.acceptedRequests?.length;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col sticky top-0">
      <nav className="flex-1 p-4 space-y-1">
        {/* Home */}
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <Home className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        {/* Friends */}
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <Users className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <Bell className="size-5 text-base-content opacity-70" />
          <span className="flex items-center gap-4">
            Notifications
            {notificationsCount > 0 && (
              <div className="badge badge-sm badge-secondary rounded-full">
                +{notificationsCount}
              </div>
            )}
          </span>
        </Link>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t-2 border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${authUser?._id}`} className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePicture} alt="User Avatar" />
            </div>
          </Link>
          <div className="flex-1">
            <Link
              to={`/profile/${authUser?._id}`}
              className="font-semibold text-sm"
            >
              {authUser?.fullName}
            </Link>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
