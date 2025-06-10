import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-background">
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row">
        <div className="lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 lg:ml-72">
          <Header />
          <main
            className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen"
            style={{
              minHeight: "calc(100vh - 64px)",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
