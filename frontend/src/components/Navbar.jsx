import { Link } from "react-router";
import { Bell, LogOut, Users } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useAuthUserQuery from "../hooks/queries/useAuthUserQuery";
import useFriendRequestsQuery from "../hooks/queries/useFriendRequestsQuery";
import useLogoutMutation from "../hooks/mutations/useLogoutMutation";

const Navbar = () => {
  const { authUser } = useAuthUserQuery();
  const { friendRequests } = useFriendRequestsQuery();

  const isUnread =
    friendRequests?.incomingRequests?.length > 0 ||
    friendRequests?.acceptedRequests?.length > 0;

  const { logoutMutation, isLoggingOut } = useLogoutMutation();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-[9dvh] flex items-center">
      <div className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between  w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#1fb854] to-[#1eb88e] tracking-wider">
              Heylo
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle -mr-2 relative">
                {isUnread && (
                  <span className="size-2.5 rounded-full bg-secondary inline-block absolute top-2 right-3 z-10" />
                )}
                <Bell className="size-6 text-base-content opacity-70" />
              </button>
            </Link>
            {/* Friends */}
            <Link to="/friends">
              <button className="btn btn-ghost btn-circle -mr-2">
                <Users className="size-6 text-base-content opacity-70" />
              </button>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* User Avatar */}
            <div className="avatar">
              <Link
                to={`/profile/${authUser?._id}`}
                className="w-8 rounded-full"
              >
                <img
                  src={authUser?.profilePicture}
                  alt="User Avatar"
                  rel="noreferrer"
                />
              </Link>
            </div>

            {/* Logout button */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}
              disabled={isLoggingOut}
            >
              <LogOut className="size-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
