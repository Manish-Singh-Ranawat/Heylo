import { Loader } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      data-theme={theme}
    >
      <Loader className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default PageLoader;
