import React, { useContext } from "react";
import Sidebar from "../../components/DashboardSidebar";
import BottomMenu from "../../components/BottomMenu";
import { AuthContext } from "../../hooks/AuthProvider";
import { Navigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactElement;
}
function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useContext(AuthContext);
  if (user.signedIn) {
    return (
      <>
        {/* for desktop */}
        <section className="hidden left-0 top-0 w-screen h-screen md:flex gap-4 justify-center bg-slate-200">
          <Sidebar />
          <div className="w-[85vw] p-2 h-[100vh] overflow-y-scroll">
            {children}
          </div>
        </section>

        {/* for mobile */}
        <section className="flex flex-col md:hidden min-h-screen max-h-screen h-screen">
          <div className="absolute h-[90%] w-screen top-0 left-0 overflow-y-scroll p-2">
            {children}
          </div>
          <BottomMenu />
        </section>
      </>
    );
  } else {
    console.log("Not logged in redirecting");
    return <Navigate to={"/auth/login"} replace />;
  }
}

export default DashboardLayout;
