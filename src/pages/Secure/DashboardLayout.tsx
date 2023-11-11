import React from "react";
import Sidebar from "../../components/DashboardSidebar";
import BottomMenu from "../../components/BottomMenu";

interface DashboardLayoutProps {
  children: React.ReactElement;
}
function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <section className="absolute top-0 left-0 w-screen min-h-screen flex flex-col md:flex-row md:justify-start gap-4">
      <Sidebar />
      <>{children}</>
      <BottomMenu />
    </section>
  );
}

export default DashboardLayout;
