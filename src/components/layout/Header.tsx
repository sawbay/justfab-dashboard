import React from "react";
import ConnectButtons from "../common/ConnectButtons";

const Header = () => {
  return (
    <div className="px-4 py-2">
      <div className="container mx-auto">
        <div className="bg-[#FFE8C8] rounded-xl px-6 py-4 mx-4">
          <div className="flex justify-end items-center">
            <ConnectButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
