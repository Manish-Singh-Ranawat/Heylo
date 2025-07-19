import ProfileForm from "../components/ProfileForm";
import useOnboardingMutation from "../hooks/mutations/useOnboardingMutation";

const OnboardingPage = () => {
  const { onboardingMutation, isOnboarding } = useOnboardingMutation();

  return (
    <ProfileForm
      isOnboarding={true}
      mutateFn={onboardingMutation}
      isPending={isOnboarding}
    />
  );
};

export default OnboardingPage;
