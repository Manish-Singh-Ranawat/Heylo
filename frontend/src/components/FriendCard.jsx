import { Link } from "react-router";
import { getLanguageFlag, capitalize } from "../lib/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <Link to={`/profile/${friend._id}`} className="avatar size-12">
            <img src={friend.profilePicture} alt={friend.fullName} />
          </Link>
          <h3 className="text-lg font-semibold truncate">
            <Link to={`/profile/${friend._id}`}>{friend.fullName}</Link>
          </h3>
        </div>
        {/* Languages */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs ">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {capitalize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline text-xs text-nowrap">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {capitalize(friend.learningLanguage)}
          </span>
        </div>

        {/* Message */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline w-full rounded-4xl"
        >
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
