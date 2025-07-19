import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ showSidebar = false, children }) => {
  return (
    <div className="max-h-screen max-w-screen">
      <Navbar />
      <div className="flex h-[91dvh] overflow-y-auto">
        {showSidebar && <Sidebar />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
