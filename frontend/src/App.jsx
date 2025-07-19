import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";
import { useThemeStore } from "./store/useThemeStore";
import useAuthUserQuery from "./hooks/queries/useAuthUserQuery";

const ProtectedRoute = ({ isAuthenticated, isOnboarded, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isOnboarded) return <Navigate to="/onboarding" />;
  return <Layout showSidebar={true}>{children}</Layout>;
};

const App = () => {
  const { authUser, isLoadingAuthUser } = useAuthUserQuery();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  const { theme } = useThemeStore();

  if (isLoadingAuthUser) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isOnboarded={isOnboarded}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* Profile */}
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isOnboarded={isOnboarded}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Friends */}
        <Route
          path="/friends"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isOnboarded={isOnboarded}
            >
              <FriendsPage />
            </ProtectedRoute>
          }
        />
        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isOnboarded={isOnboarded}
            >
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        {/* Chat */}
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isOnboarded={isOnboarded}
            >
              <ChatPage />
            </ProtectedRoute>
          }
        />
        {/* Call */}
        <Route
          path="/call/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isOnboarded={isOnboarded}
            >
              <CallPage />
            </ProtectedRoute>
          }
        />
        {/* Login */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        {/* Signup */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to={"/"} />
              ) : (
                <OnboardingPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
