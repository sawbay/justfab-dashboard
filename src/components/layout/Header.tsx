import React from "react";
import ConnectButtons from "../common/ConnectButtons";
import { IMAGES } from "@/constants/images";

const Header = () => {
  return (
    <div
      className="px-1 py-2 h-40"
      style={{
        backgroundImage: `url(${IMAGES.bgHeader})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-end items-center h-30 pr-40 pt-5">
          <ConnectButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;
