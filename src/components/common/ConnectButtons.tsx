import React, { useEffect } from "react";
import Button from "./Button";
import { useAuthUi } from "@futureverse/auth-ui";
import { shortenAddress } from "@/utils/addressUtils";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginButton } from "@telegram-auth/react";
import { BOT_USERNAME } from "@/utils/env";
import { useAuth } from "@futureverse/auth-react";
import axios from "axios";

const ConnectButtons: React.FC<{}> = ({ }) => {
  const { openLogin } = useAuthUi();
  const { userSession: fpSession, signOutPass } = useAuth();
  const { data: tgSession } = useSession();

  useEffect(() => {
    if (fpSession && tgSession) {
      axios.post("/api/linkfp", {
        telegramId: Number(tgSession.user?.id),
        futurepass: fpSession.futurepass,
      })
        .then(() => { })
        .catch(console.error)
        .finally(() => { });
    }
  }, [fpSession]);

  const handleWalletConnect = () => {
    if (!fpSession) {
      openLogin();
    } else {
      signOutPass();
    }
  };

  return (
    <div className="flex gap-3">
      {tgSession ?
        <>
          <Button
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => {
              signOut();
            }}
          >{tgSession.user?.name}
          </Button>
          <Button
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => handleWalletConnect()}
          >
            {fpSession?.futurepass
              ? `${shortenAddress(fpSession?.futurepass)}`
              : "Connect Wallet"}
          </Button>
        </>
        :
        <LoginButton
          botUsername={BOT_USERNAME}
          onAuthCallback={(data: any) => {
            signIn("telegram-login", undefined, data as any);
          }}
        />
      }
    </div>
  );
};

export default ConnectButtons;
