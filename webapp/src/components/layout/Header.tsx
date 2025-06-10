import React from "react";
import ConnectButtons from "../common/ConnectButtons";
import { IMAGES } from "@/utils/images";

const Header = () => {
  return (
    <div
      className="px-4 sm:px-6 lg:px-8 py-2 h-32 sm:h-40"
      style={{
        backgroundImage: `url(${IMAGES.bgHeader})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-end items-center h-full pr-4 sm:pr-8 lg:pr-40 pt-2 sm:pt-5">
          <ConnectButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;
