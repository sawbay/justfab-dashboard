import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-orange-50/30">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
