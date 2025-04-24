import React, { useEffect, useState } from "react";
import ConnectButtons from "../common/ConnectButtons";
import { useAuth } from "@futureverse/auth-react";

const Header = () => {
  const { userSession } = useAuth();
  const [futurePassAddr, futurePassAddrSet] = useState("");

  useEffect(() => {
    futurePassAddrSet(userSession?.futurepass ?? "")
  }, [userSession]);

  return (
    <div className="px-4 py-2">
      <div className="container mx-auto">
        <div className="bg-[#FFE8C8] rounded-xl px-6 py-4 mx-4">
          <div className="flex justify-end items-center">
            <ConnectButtons walletAddress={futurePassAddr}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
