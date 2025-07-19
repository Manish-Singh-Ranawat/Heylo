import { useState } from "react";
import { Link } from "react-router";
import useSignupMutation from "../hooks/mutations/useSignupMutation";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signupMutation, isSigningUp, error } = useSignupMutation();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex justify-center items-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Heylo
            </span>
          </div>

          {/* error  */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* Signup Form */}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                {/* heading */}
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Heylo and start chatting with your friends
                  </p>
                </div>

                <div className="space-y-3 ">
                  {/* Username */}
                  <div className="form-control w-full">
                    <label
                      htmlFor="username"
                      className="label mb-1 cursor-pointer"
                    >
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="John Doe"
                      className="input focus:input-primary input-bordered w-full"
                      value={signupData.username}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          username: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="form-control w-full">
                    <label
                      htmlFor="email"
                      className="label mb-1 cursor-pointer"
                    >
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="heylo@example.com"
                      className="input focus:input-primary input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="form-control w-full">
                    <label
                      htmlFor="password"
                      className="label mb-1 cursor-pointer"
                    >
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="******"
                      className="input focus:input-primary input-bordered w-full"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1 ml-4">
                      Password must be at least 6 characters
                    </p>
                  </div>
                  {/* Terms and Conditions */}
                  <div className="form-control mt-2">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                {/* Signup Button */}
                <button className="btn btn-primary w-full" type="submit">
                  {isSigningUp ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
                {/* Already have an account */}
                <div className="text-center">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/auth.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
