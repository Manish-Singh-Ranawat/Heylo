import { Link } from "react-router";
import { Search, Users } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import RecommendedUserCard from "../components/RecommendedUserCard";
import useFriendsQuery from "../hooks/queries/useFriendsQuery";
import useRecommendedUsersQuery from "../hooks/queries/useRecommendedUsersQuery";
import { useEffect, useState } from "react";
import useSearchUsersQuery from "../hooks/queries/useSearchUsersQuery";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
    }, 300); // 300ms delay
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { friends, isLoadingFriends } = useFriendsQuery();
  const { recommendedUsers, isLoadingRecommendedUsers } =
    useRecommendedUsersQuery();
  const { searchUsers, isLoadingSearchUsers } = useSearchUsersQuery(
    searchInput.trim()
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Friends Header */}
        <div className="flex flex-row items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/friends" className="btn btn-outline btn-sm">
            <Users className="mr-1 size-4" />
            View All Friends
          </Link>
        </div>

        {/* Friends */}
        {isLoadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...friends]
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
          </div>
        )}

        <section>
          {/* Recommended Header */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
            {/* Search */}
            <label className="input">
              <Search className="size-4 opacity-50" />
              <input
                type="search"
                required
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
          </div>

          {searchInput.trim() ? (
            <>
              {/* Search Results */}
              <div className="mb-6 sm:mb-8">
                {isLoadingSearchUsers ? (
                  <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg" />
                  </div>
                ) : searchUsers?.length === 0 ? (
                  <div className="card bg-base-200 p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">
                      No users matched your search.
                    </h3>
                    <p className="text-base-content opacity-70"></p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchUsers?.map((user) => (
                      <RecommendedUserCard
                        key={user._id}
                        recommendedUser={user}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Recommended User */}
              {isLoadingRecommendedUsers ? (
                <div className="flex justify-center py-12">
                  <span className="loading loading-spinner loading-lg" />
                </div>
              ) : recommendedUsers.length === 0 ? (
                // No recommended users
                <div className="card bg-base-200 p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">
                    No recommendations available
                  </h3>
                  <p className="text-base-content opacity-70">
                    Check back later for new language partners!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {recommendedUsers.map((recommendedUser) => {
                    return (
                      <RecommendedUserCard
                        key={recommendedUser._id}
                        recommendedUser={recommendedUser}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
