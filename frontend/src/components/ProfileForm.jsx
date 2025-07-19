import { useState } from "react";
import toast from "react-hot-toast";
import {
  CameraIcon,
  MapPin,
  ShipWheel,
  ShuffleIcon,
  UserCog,
} from "lucide-react";
import { LANGUAGES } from "../constants";
import useAuthUserQuery from "../hooks/queries/useAuthUserQuery";

const ProfileForm = ({ isOnboarding, mutateFn, isPending, setIsEditing }) => {
  const { authUser } = useAuthUserQuery();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePicture: authUser?.profilePicture || "",
  });

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePicture: randomAvatar });
    toast.success("Random profile picture generated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateFn(formState);
    if (setIsEditing) setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-center items-center flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              {isOnboarding ? "Complete Your Profile" : "Update Your Profile"}
            </h1>
            <span className="text-sm text-gray-400">@{authUser?.username}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile picture */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePicture ? (
                  <img
                    src={formState.profilePicture}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* Generate Random Avatar Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Bio */}
            <div className="form-control flex flex-col">
              <label className="label mb-1">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered w-full h-24 resize-none"
                placeholder="Tell others about yourself and your language learning goals"
                required
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Language */}
              <div className="form-control">
                <label className="label mb-1">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                  required
                >
                  <option value=""> Select your native language</option>
                  {LANGUAGES.map((language) => (
                    <option key={language} value={language.toLowerCase()}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learning Language */}
              <div className="form-control">
                <label className="label mb-1">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                  required
                >
                  <option value=""> Select your learning language</option>
                  {LANGUAGES.map((language) => (
                    <option key={language} value={language.toLowerCase()}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70 z-10" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : isOnboarding ? (
                <>
                  <ShipWheel className="size-5 mr-2" />
                  Continue Onboarding
                </>
              ) : (
                <>
                  <UserCog className="size-5 mr-2" />
                  Update Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
