import React, { useEffect, useState } from "react";
import ConnectButtons from "../common/ConnectButtons";
import { useAuth } from "@futureverse/auth-react";
import { useSession } from "next-auth/react";

const Header = () => {
  const { userSession: fpSession } = useAuth();
  const { data: tgSession } = useSession();

  const [futurePassAddr, futurePassAddrSet] = useState("");
  const [tgUsername, tgUsernameSet] = useState("");

  useEffect(() => {
    futurePassAddrSet(fpSession?.futurepass ?? "")
  }, [fpSession]);

  useEffect(() => {
    tgUsernameSet(tgSession?.user?.name ?? "")
  }, [tgSession]);

  return (
    <div className="px-4 py-2">
      <div className="container mx-auto">
        <div className="bg-[#FFE8C8] rounded-xl px-6 py-4 mx-4">
          <div className="flex justify-end items-center">
            <ConnectButtons telegramName={tgUsername} walletAddress={futurePassAddr} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
