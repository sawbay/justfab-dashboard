import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { IMAGES } from "@/constants/images";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen relative bg-[#f7ecd7]"
      style={{
        backgroundImage: `url(${IMAGES.mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#FFE8C8]/40 to-white" />

      {/* Subtle stripes */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #FFE8C8,
            #FFE8C8 2px,
            transparent 2px,
            transparent 12px
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 lg:ml-72">
          <Header />
          <main
            className="container mx-auto px-4 py-8 min-h-screen"
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
