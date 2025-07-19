import { Link } from "react-router";
import { MapPin } from "lucide-react";
import { capitalize, getLanguageFlag } from "../lib/utils";
import OutgoingFriendRequestButton from "./OutgoingFriendRequestButton";

const RecommendedUserCard = ({ recommendedUser }) => {
  return (
    <div
      key={recommendedUser._id}
      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="card-body p-5 space-y-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          <Link
            to={`/profile/${recommendedUser._id}`}
            className="avatar size-16 rounded-full"
          >
            <img
              src={recommendedUser.profilePicture}
              alt={recommendedUser.fullName}
            />
          </Link>
          <div>
            <h3 className="font-semibold text-lg">
              <Link to={`/profile/${recommendedUser._id}`}>
                {recommendedUser.fullName}
              </Link>
            </h3>
            {recommendedUser.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPin className="size-3 mr-1" />
                {recommendedUser.location}
              </div>
            )}
          </div>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(recommendedUser.nativeLanguage)}
            Native: {capitalize(recommendedUser.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(recommendedUser.learningLanguage)}
            Learning: {capitalize(recommendedUser.learningLanguage)}
          </span>
        </div>

        {/* Bio */}
        {recommendedUser.bio && (
          <p className="text-sm opacity-70">{recommendedUser.bio}</p>
        )}

        {/* Action button */}
        <OutgoingFriendRequestButton userId={recommendedUser._id} />
      </div>
    </div>
  );
};

export default RecommendedUserCard;
