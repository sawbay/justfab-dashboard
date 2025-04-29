import React from "react";
import Button from "./Button";
import { useAuthUi } from "@futureverse/auth-ui";
import { shortenAddress } from "@/utils/addressUtils";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginButton } from "@telegram-auth/react";
import { BOT_USERNAME } from "@/utils/env";
import { useAuth } from "@futureverse/auth-react";

const ConnectButtons: React.FC<{}> = ({ }) => {
  const { openLogin } = useAuthUi();
  const { userSession: fpSession } = useAuth();

  const { data: tgSession, status } = useSession();

  const handleTelegramConnect = () => {
    // TODO: Implement Telegram connection logic
    console.log("Connecting to Telegram...");
  };

  const handleWalletConnect = () => {
    if (!fpSession) {
      openLogin();
    }
  };

  return (
    <div className="flex gap-3">
      {tgSession ?
        <Button
          className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            signOut();
          }}
        >{tgSession.user?.name}</Button> :
        <LoginButton
          botUsername={BOT_USERNAME}
          onAuthCallback={(data: any) => {
            signIn("telegram-login", undefined, data as any);
          }}
        />
      }
      <Button
        className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
        onClick={() => handleWalletConnect()}
      >
        {fpSession?.futurepass ? `${shortenAddress(fpSession?.futurepass)}` : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectButtons;
